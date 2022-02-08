module.exports = {
   type: 'mysql',
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   synchronize: true,
   logging: true,
   entities: [
      'src/app/models/entities/*.ts',
   ],
   migrations: [
      'src/database/migrations/*.ts',
   ],
   subscribers: [
      'src/subscriber/**/*.ts',
   ],
   cli: {
      entitiesDir: 'src/app/models',
      migrationsDir: 'src/database/migrations',
      seedersDir: 'src/database/seeders',
      // subscribersDir: 'src/subscriber',
   },
};
