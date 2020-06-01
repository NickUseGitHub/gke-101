import { createConnection, Connection } from 'typeorm'
import {
  DB_PORT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from './configs'

async function connectToDB(tryCount: number): Promise<Connection | null> {
  if (tryCount <= 0) return null

  try {
    const dbPort: number = Number(DB_PORT) || 5432
    const connection: Connection = await createConnection({
      type: 'postgres',
      host: DB_HOST || 'localhost',
      port: dbPort,
      username: DB_USERNAME || 'postgres',
      password: DB_PASSWORD,
      database: DB_DATABASE,
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
