import { createConnection, Connection } from 'typeorm'

export default async function initialConnection() {
  const dbPort: number = Number(process.env.DB_PORT) || 5432

  const connection: Connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: dbPort,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [`${__dirname}/entities/*.js`],
  })

  return connection
}
