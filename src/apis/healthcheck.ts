import Router from 'koa-router'
import { Context } from 'koa'

const healthcheckRouter = new Router()

healthcheckRouter.get('/health', function (ctx: Context) {
  ctx.body = {
    message: 'app is ok.',
  }
})

export default healthcheckRouter
