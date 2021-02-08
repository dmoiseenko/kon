async function route(fastify, options) {
  fastify.post("/edit_todo", async (request, reply) => {
    return fastify.pg.transact(async (client) => {
      const id = request.body.input.id
      const text = request.body.input.text

      const response = await client.query(
        "UPDATE zoru.todo SET text = $1 WHERE id = $2;",
        [text, id]
      )

      console.log(response)

      return { id }
    })
  })
}

module.exports = {
  route,
}
