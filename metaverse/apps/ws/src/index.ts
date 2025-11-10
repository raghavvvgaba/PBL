import { config } from 'dotenv';
import { WebSocketServer } from 'ws';
import { User } from './User';

// Load environment variables from root directory
config({ path: '../../.env' });

console.log('🔍 Environment Variables Debug:');
console.log('  WS_PORT:', process.env.WS_PORT);
console.log('  JWT_PASSWORD:', process.env.JWT_PASSWORD ? 'SET' : 'NOT SET');
console.log('  DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');

const port = parseInt(process.env.WS_PORT || '3001');
const wss = new WebSocketServer({ port });

console.log(`🔌 WebSocket Server running on ws://localhost:${port}`);
console.log(`🔑 JWT Password configured: ${!!process.env.JWT_PASSWORD}`);

wss.on('connection', function connection(ws) {
  console.log("👤 User connected")
  let user = new User(ws);
  ws.on('error', console.error);

  ws.on('close', () => {
    user?.destroy();
  });
});