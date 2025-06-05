import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

let socket: Socket;

export default defineNuxtPlugin(() => {
    if (!socket) {
        socket = io();

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
    }

    return {
        provide: {
            socket,
        },
    };
});
