async function route(fastify, options) {
  fastify.post("/remove_todo", async (request, reply) => {
    return fastify.pg.transact(async (client) => {
      const id = request.body.input.id

      const response = await client.query(
        "DELETE FROM zoru.todo WHERE id = $1;",
        [id]
      )

      return { id }
    })
  })
}

module.exports = {
  route,
}
