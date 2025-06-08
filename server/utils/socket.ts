// server/utils/socket.ts
import type { Server } from 'socket.io';

let io: Server | null = null;

export function setIO(server: Server) {
	io = server;
}

export function getIO(): Server {
	if (!io) throw new Error('Websocket not initialized!');
	return io;
}
