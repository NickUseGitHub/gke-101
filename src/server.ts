import './configs'
import initialConnection from './connections'
import app from './app'
import { Connection } from 'typeorm'

const port = process.env.PORT || 3000

/**
 * Start Express server.
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
        '  App is running at http://localhost:%d in %s mode',
        process.env.PORT,
        process.env.PROJECT_ENV,
      )
      console.log('  Press CTRL-C to stop\n')
    })
  })
  .catch(function (error) {
    console.error(error)
    process.exit(1)
  })
