import './configs'
import app from './app'

const port = process.env.PORT || 3000

/**
 * Start Express server.
 */
const server = app.listen(port, () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    process.env.PORT,
    process.env.PROJECT_ENV,
  )
  console.log('  Press CTRL-C to stop\n')
})

export default server
