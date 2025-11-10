import { useEffect, useRef, useState } from 'react';

// Canvas configuration constants
const GRID_SIZE = 8; // 8x8 grid
const TILE_SIZE = 50; // Each tile is 50 pixels

// TypeScript interfaces
interface User {
  x: number;
  y: number;
  userId: string;
}

interface Position {
  x: number;
  y: number;
}

interface MovementState {
  moveSequence: number;
  pendingMoves: Map<number, Position>;
  predictedPosition: Position;
}


const Arena = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [params, setParams] = useState({ token: '', spaceId: '' });

  // Enhanced movement state for client-side prediction
  const [movementState, setMovementState] = useState<MovementState>({
    moveSequence: 0,
    pendingMoves: new Map(),
    predictedPosition: { x: 0, y: 0 }
  });

  // Initialize WebSocket connection and handle URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || '';
    const spaceId = urlParams.get('spaceId') || '';
    setParams({ token, spaceId });

    // Initialize WebSocket with configurable URL
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    console.log(`🔗 Connecting to WebSocket at: ${wsUrl}`);
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log('✅ WebSocket connected successfully');
      // Join the space once connected
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({
          type: 'join',
          payload: {
            spaceId,
            token
          }
        }));
      }
    };

    wsRef.current.onerror = (error: Event) => {
      console.error('❌ WebSocket connection error:', error);
      console.error('📍 WebSocket URL:', wsUrl);
    };

    wsRef.current.onclose = (event: CloseEvent) => {
      console.log('🔌 WebSocket connection closed:', event.code, event.reason);
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      handleWebSocketMessage(message);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleWebSocketMessage = (message: { type: string; payload: any }) => {
    switch (message.type) {
      case 'space-joined':
        // Initialize current user position and other users
        console.log("set")
        console.log({
            x: message.payload.spawn.x,
            y: message.payload.spawn.y,
            userId: message.payload.userId
          })
        setCurrentUser({
          x: message.payload.spawn.x,
          y: message.payload.spawn.y,
          userId: message.payload.userId
        });

        // Initialize movement state with spawn position
        setMovementState({
          moveSequence: 0,
          pendingMoves: new Map(),
          predictedPosition: {
            x: message.payload.spawn.x,
            y: message.payload.spawn.y
          }
        });

        // Initialize other users from the payload
        const userMap = new Map();
        message.payload.users.forEach((user: any) => {
          userMap.set(user.userId, user);
        });
        setUsers(userMap);
        break;

      case 'user-joined':
        setUsers(prev => {
          const newUsers = new Map(prev);
          newUsers.set(message.payload.userId, {
            x: message.payload.x,
            y: message.payload.y,
            userId: message.payload.userId
          });
          return newUsers;
        });
        break;

      case 'movement':
        setUsers(prev => {
          const newUsers = new Map(prev);
          const user = newUsers.get(message.payload.userId);
          if (user) {
            user.x = message.payload.x;
            user.y = message.payload.y;
            newUsers.set(message.payload.userId, user);
          }
          return newUsers;
        });
        break;

      case 'movement-rejected':
        // Reset current user position if movement was rejected
        setCurrentUser(prev => prev ? {
          ...prev,
          x: message.payload.x,
          y: message.payload.y
        } : null);

        // Reset predicted position to match rejected position
        setMovementState(prev => ({
          ...prev,
          predictedPosition: { x: message.payload.x, y: message.payload.y }
        }));
        break;

      case 'move-ack':
        // Remove acknowledged move from pending moves
        const acknowledgedSequence = message.payload.sequence;
        setMovementState((prev: MovementState) => {
          const newPendingMoves = new Map(prev.pendingMoves);
          newPendingMoves.delete(acknowledgedSequence);

          return {
            ...prev,
            pendingMoves: newPendingMoves,
            predictedPosition: { x: message.payload.x, y: message.payload.y }
          };
        });
        break;

      case 'user-left':
        setUsers(prev => {
          const newUsers = new Map(prev);
          newUsers.delete(message.payload.userId);
          return newUsers;
        });
        break;
    }
  };

  // Validate if position is within canvas boundaries
  const isValidPosition = (x: number, y: number): boolean => {
    return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
  };

  // Handle user movement with client-side prediction
  const handleMove = (newX: any, newY: any) => {
    if (!currentUser) return;

    // Validate boundaries BEFORE client-side prediction
    if (!isValidPosition(newX, newY)) {
      return; // Don't process invalid movements
    }

    // Calculate sequence number first
    const newSequence = movementState.moveSequence + 1;

    // Client-side prediction: update position immediately
    setMovementState(prev => {
      const newPendingMoves = new Map(prev.pendingMoves).set(newSequence, { x: newX, y: newY });

      return {
        ...prev,
        moveSequence: newSequence,
        pendingMoves: newPendingMoves,
        predictedPosition: { x: newX, y: newY }
      };
    });

    // Update current user immediately for instant feedback
    setCurrentUser(prev => prev ? {
      ...prev,
      x: newX,
      y: newY
    } : null);

    // Send movement request to server with sequence number
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify({
        type: 'move',
        payload: {
          x: newX,
          y: newY,
          userId: currentUser.userId,
          sequence: newSequence,
          timestamp: Date.now()
        }
      }));
    }
  };

  // Draw the arena
  useEffect(() => {
    console.log("render")
    const canvas = canvasRef.current;
    if (!canvas) return;
    console.log("below render")
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#eee';
    for (let i = 0; i < canvas.width; i += TILE_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += TILE_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw arena border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1; // Reset line width

    console.log("before curerntusert")
    console.log(currentUser)
    // Draw current user
    if (currentUser && currentUser.x !== undefined) {
      ctx.beginPath();
      ctx.fillStyle = '#FF6B6B';
      ctx.arc(currentUser.x * TILE_SIZE, currentUser.y * TILE_SIZE, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('You', currentUser.x * TILE_SIZE, currentUser.y * TILE_SIZE + 40);
    }

    // Draw other users
    users.forEach(user => {
      if (user.x === undefined) {
        return;
      }
      ctx.beginPath();
      ctx.fillStyle = '#4ECDC4';
      ctx.arc(user.x * TILE_SIZE, user.y * TILE_SIZE, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`User ${user.userId}`, user.x * TILE_SIZE, user.y * TILE_SIZE + 40);
    });
  }, [currentUser, users]);

  const handleKeyDown = (e: any) => {
    if (!currentUser) return;

    const { x, y } = currentUser;
    let newX = x;
    let newY = y;

    switch (e.key) {
      case 'ArrowUp':
        newY = y - 1;
        break;
      case 'ArrowDown':
        newY = y + 1;
        break;
      case 'ArrowLeft':
        newX = x - 1;
        break;
      case 'ArrowRight':
        newX = x + 1;
        break;
      default:
        return;
    }

    // Use the same boundary validation function
    if (isValidPosition(newX, newY)) {
      handleMove(newX, newY);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4" onKeyDown={handleKeyDown} tabIndex={0}>
        <h1 className="text-2xl font-bold mb-4">Arena</h1>
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">Token: {params.token}</p>
          <p className="text-sm text-gray-600">Space ID: {params.spaceId}</p>
          <p className="text-sm text-gray-600">Connected Users: {users.size + (currentUser ? 1 : 0)}</p>
        </div>
        <div className="w-[500px] h-[500px] border rounded-lg overflow-hidden shadow-lg bg-white flex items-center justify-center p-[50px]">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="bg-white"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">Use arrow keys to move your avatar</p>
    </div>
  );
};

export default Arena;