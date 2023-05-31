module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'db.cjyieezuuvkctchwaymc.supabase.co'), // Update with your Supabase host
        port: env.int('DATABASE_PORT', 5432), // Update with your Supabase port
        database: env('DATABASE_NAME', 'postgres'), // Update with your Supabase database name
        username: env('DATABASE_USERNAME', 'postgres'), // Update with your Supabase database username
        password: env('DATABASE_PASSWORD', 'hOxl6Pzm6SLmGQEo'), // Update with your Supabase database password
        schema: env('DATABASE_SCHEMA', 'public'), // Update with your Supabase schema name (default is 'public')
        ssl: env.bool('DATABASE_SSL', false), // Set to true if your Supabase instance requires SSL
      },
      options: {},
    },
  },
});
