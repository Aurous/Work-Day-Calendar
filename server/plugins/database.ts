export default defineNitroPlugin((nitro) => {
	nitro.hooks.hook('request', async (event) => {
		if (event.path.includes('/api')) event.context.knex = getKnex();
	});
	nitro.hooks.hook('afterResponse', async (event) => {
		if (event.context.knex) event.context.knex.destroy();
	});
});
