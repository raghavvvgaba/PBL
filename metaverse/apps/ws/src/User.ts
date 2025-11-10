import { WebSocket } from "ws";
import { RoomManager } from "./RoomManager";
import { OutgoingMessage } from "./types";
import client from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

function getRandomString(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getRandomPosition(): { x: number; y: number } {
    const GRID_SIZE = 8;
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return { x, y };
}

export class User {
    public id: string;
    public userId?: string;
    private spaceId?: string;
    private x: number;
    private y: number;
    private ws: WebSocket;

    constructor(ws: WebSocket) {
        this.id = getRandomString(10);
        this.x = 0;
        this.y = 0;
        this.ws = ws;
        this.initHandlers()
    }

    initHandlers() {
        this.ws.on("message", async (data) => {
            console.log(data)
            const parsedData = JSON.parse(data.toString());
            console.log(parsedData)
            console.log("parsedData")
            switch (parsedData.type) {
                case "join":
                    console.log("jouin receiverdfd")
                    const spaceId = parsedData.payload.spaceId || "default-space";
                    // Skip JWT verification - generate random user ID instead
                    const userId = getRandomString(10);
                    console.log("jouin receiverdfd 2")
                    this.userId = userId

                    // Skip database space lookup - use default space
                    console.log("jouin receiverdfd 3 - using default space")
                    console.log("jouin receiverdfd 4")
                    this.spaceId = spaceId
                    console.log("Before RoomManager.addUser")
                    RoomManager.getInstance().addUser(spaceId, this);
                    console.log("After RoomManager.addUser")
                    // Spawn users at random position in 8x8 grid
                    const spawnPosition = getRandomPosition();
                    this.x = spawnPosition.x;
                    this.y = spawnPosition.y;
                    console.log(`User ${this.userId} spawned at random position (${this.x}, ${this.y})`);
                    this.send({
                        type: "space-joined",
                        payload: {
                            spawn: {
                                x: this.x,
                                y: this.y
                            },
                            users: RoomManager.getInstance().rooms.get(spaceId)?.filter(x => x.id !== this.id)?.map((u) => ({userId: u.userId, x: u.x, y: u.y})) ?? []
                        }
                    });
                    console.log("jouin receiverdf5")
                    RoomManager.getInstance().broadcast({
                        type: "user-joined",
                        payload: {
                            userId: this.userId,
                            x: this.x,
                            y: this.y
                        }
                    }, this, this.spaceId!);
                    break;
                case "move":
                    const moveX = parsedData.payload.x;
                    const moveY = parsedData.payload.y;
                    const sequence = parsedData.payload.sequence || 0;
                    const timestamp = parsedData.payload.timestamp || Date.now();
                    const xDisplacement = Math.abs(this.x - moveX);
                    const yDisplacement = Math.abs(this.y - moveY);

                    // Check if movement is valid (one step in cardinal direction) and within 8x8 grid bounds
                    const isValidMove = (xDisplacement == 1 && yDisplacement== 0) || (xDisplacement == 0 && yDisplacement == 1);
                    const isInBounds = moveX >= 0 && moveX < 8 && moveY >= 0 && moveY < 8;

                    if (isValidMove && isInBounds) {
                        this.x = moveX;
                        this.y = moveY;

                        // Send acknowledgment to the client that initiated the move
                        this.send({
                            type: "move-ack",
                            payload: {
                                sequence: sequence,
                                x: this.x,
                                y: this.y,
                                success: true,
                                timestamp: timestamp
                            }
                        });

                        RoomManager.getInstance().broadcast({
                            type: "movement",
                            payload: {
                                userId: this.userId,
                                x: this.x,
                                y: this.y,
                                sequence: sequence
                            }
                        }, this, this.spaceId!);
                        return;
                    }
                    
                    this.send({
                        type: "movement-rejected",
                        payload: {
                            x: this.x,
                            y: this.y
                        }
                    });
                    
            }
        });
    }

    destroy() {
        RoomManager.getInstance().broadcast({
            type: "user-left",
            payload: {
                userId: this.userId
            }
        }, this, this.spaceId!);
        RoomManager.getInstance().removeUser(this, this.spaceId!);
    }

    send(payload: OutgoingMessage) {
        this.ws.send(JSON.stringify(payload));
    }
}