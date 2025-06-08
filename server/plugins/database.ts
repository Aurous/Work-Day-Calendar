export default defineNitroPlugin((nitro) => {
	nitro.hooks.hook('request', async (event) => {
		if (event.path.startsWith('/api')) {
			event.context.knex = getKnex();
		}
	});
	// since we are not spawning an instance of knex each call
	// we do not need to destory the only connection
	// we can just reuse the current one
	// nitro.hooks.hook('afterResponse', async (event) => {
	// 	if (event.context.knex) event.context.knex.destroy();
	// });
});
