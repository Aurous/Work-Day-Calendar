export default defineNitroPlugin((nitro) => {
	nitro.hooks.hook('request', async (event) => {
		console.log('nitro here');
		event.context.db = getKnex();
	});
	nitro.hooks.hook('afterResponse', async (event) =>
		event.context.db.destroy()
	);
});
