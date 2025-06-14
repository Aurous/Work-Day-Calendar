export default defineTask({
	meta: {
		name: 'fetchCalendars',
		description: 'Get all calendar information',
	},
	run(_event) {
		console.log('calendar time');

		getSocket().emit('update', 'asdf');

		return { result: 'Success' };
	},
});
