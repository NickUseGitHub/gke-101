import { createConnection, Connection } from 'typeorm'

async function connectToDB(tryCount: number): Promise<Connection | null> {
  if (tryCount <= 0) return null

  try {
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
  } catch (error) {
    console.error(`:: Error :: ${tryCount} try to connect DB`, error)

    await (function () {
      return new Promise(function delay(resolve) {
        const waitingTime = 3000
        let countDown = waitingTime / 1000 - 1
        const intervalId = setInterval(function () {
          console.log(`try to connect in ${countDown}...`)
          countDown--
        }, 1000)

        setTimeout(function () {
          clearInterval(intervalId)
          resolve()
        }, waitingTime)
      })
    })()
    return connectToDB(tryCount - 1)
  }
}

export default async function initialConnection() {
  return connectToDB(3)
}
