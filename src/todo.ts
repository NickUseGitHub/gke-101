import Router from 'koa-router'
import { Context } from 'koa'

const todo = new Router()

todo.get('/todo', function (ctx: Context) {
  ctx.body = [
    {
      id: 1,
      name: 'name1',
    },
    {
      id: 2,
      name: 'name2',
    },
    {
      id: 3,
      name: 'name3',
    },
  ]
})

export default todo
