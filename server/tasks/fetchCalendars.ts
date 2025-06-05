export default defineTask({
    meta: {
        name: "fetchCalendars",
        description: "Get all calendar information",
    },
    run(_event) {
        console.log("calendar time");
        
        const socket = getIO();
        socket.emit('update', 'asdf')

        return { result: "Success" };
    },
});