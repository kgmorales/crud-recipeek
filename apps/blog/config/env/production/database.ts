export default ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
		host: env('DATABASE_HOST', 'dpg-chsdc43hp8u4o31lrrq0-a.ohio-postgres.render.com'),
			port: env.int('DATABASE_PORT', 5432),
			database: env('DATABASE_NAME', 'lamoradb'),
			user: env('DATABASE_USERNAME', 'kevinmoral_es'),
			password: env('DATABASE_PASSWORD', 'cyqlncSxalxeqNgeVZOTi6xCN3FpLtA7'),
			ssl: env.bool('DATABASE_SSL', false)
		}
	}
});
