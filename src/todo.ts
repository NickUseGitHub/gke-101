import Router from 'koa-router'
import { Context } from 'koa'
import { getRepository } from 'typeorm'

import { Todo } from './entities/todo'

const todo = new Router()

todo.get('/todo', async function (ctx: Context) {
  const todoRepository = getRepository(Todo)
  const [todoes, totalCount] = await todoRepository.findAndCount()

  ctx.body = todoes
})

export default todo
