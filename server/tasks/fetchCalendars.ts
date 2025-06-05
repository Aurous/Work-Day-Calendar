export default defineTask({
    meta: {
        name: "fetchCalendars",
        description: "Get all calendar information",
    },
    run({ payload, context }) {
        console.log("calendar time");
        
        const socket = getIO();
        socket.emit('update', 'asdf')

        return { result: "Success" };
    },
});