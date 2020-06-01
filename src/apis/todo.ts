import Router from 'koa-router'
import { Context } from 'koa'
import { getRepository, getManager } from 'typeorm'

import { Todo } from '../entities/todo'

const todoRouter = new Router()

todoRouter.get('/testpath', async function (ctx: Context) {
  const todoRepository = getRepository(Todo)
  const todoes = await todoRepository.find()

  ctx.body = todoes
})

todoRouter.post('/testpath', async function (ctx: Context) {
  const todo = new Todo()
  todo.name = ctx.request.body.name

  const entityManager = getManager()
  await entityManager.save(todo)

  ctx.body = todo
})

export default todoRouter
