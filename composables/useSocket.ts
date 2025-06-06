import type { Socket } from 'socket.io-client';

export function useSocket() {
	// get the socket
	const { $socket: socket }: { $socket: Socket } = useNuxtApp();
	// list of listeners
	const listeners: Array<string> = [];

	// lazy removing listeners
	onUnmounted(() => listeners.forEach((event) => socket?.off(event)));

	return {
		...socket,
		on: (event: string, callback: (data: unknown) => void) => {
			// // check for existing listener
			// if (!listeners.includes(event)) {
			// create listener
			socket?.on(event, callback);
			// add listener to list
			listeners.push(event);
			// }
		},
	};
}
