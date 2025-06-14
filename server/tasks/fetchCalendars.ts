export default defineTask({
	meta: {
		name: 'fetchCalendars',
		description: 'Get all calendar information',
	},
	run(_event) {
		getSocket().emit('update', 'asdf');

		return { result: 'Success' };
	},
});
