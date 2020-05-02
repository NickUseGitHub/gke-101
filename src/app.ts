import Koa, { Context } from 'koa'
import todo from './todo'

const app = new Koa()

// logger

app.use(async (ctx: Context, next: Function) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time

app.use(async (ctx: Context, next: Function) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// response

app.use(todo.routes())

export default app
