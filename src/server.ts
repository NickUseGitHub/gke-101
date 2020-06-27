import './envInitiator'
import { PORT, PROJECT_ENV } from './configs'
import { Connection } from 'typeorm'
import initialConnection from './connections'
import app from './app'

const port = PORT

/**
 * Start Koa server.
 */
initialConnection()
  .then(function (connection: Connection) {
    app.listen(port, () => {
      if (connection && connection.isConnected) {
        console.log('[√] DB connected')
      } else {
        console.log('[X] DB no connected')
        throw new Error('Cannot connect to DB')
      }

      console.log(
        '  App version V.3 is running at http://localhost:%d in %s mode',
        PORT,
        PROJECT_ENV,
      )
      console.log('  Press CTRL-C to stop\n')
    })
  })
  .catch(function (error) {
    console.error(error)
    process.exit(1)
  })
