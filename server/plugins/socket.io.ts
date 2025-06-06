import { Server as Engine } from 'engine.io';
import { defineEventHandler } from 'h3';
import type { NitroApp } from 'nitropack';
import { Server } from 'socket.io';

export default defineNitroPlugin((nitroApp: NitroApp) => {
	const engine = new Engine();
	const io = new Server();

	setIO(io);

	io.bind(engine);

	nitroApp.router.use(
		'/socket.io/',
		defineEventHandler({
			handler(event) {
				// @ts-expect-error private method and property
				engine.handleRequest(event.node.req, event.node.res);
				event._handled = true;
			},
			websocket: {
				open(peer) {
					// @ts-expect-error private method and property
					engine.prepare(peer._internal.nodeReq);
					// @ts-expect-error private method and property
					engine.onWebSocket(
						peer._internal.nodeReq,
						peer._internal.nodeReq.socket,
						peer.websocket
					);
				},
			},
		})
	);
});
