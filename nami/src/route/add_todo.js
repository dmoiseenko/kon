const { v4: uuidv4 } = require("uuid")

async function route(fastify, options) {
  fastify.post("/add_todo", async (request, reply) => {
    return fastify.pg.transact(async (client) => {
      const id = uuidv4()
      const text = request.body.input.text

      const response = await client.query(
        "INSERT INTO zoru.todo VALUEs($1, $2) RETURNING id, text;",
        [id, text]
      )

      return { id: response.rows[0].id }
    })
  })
}

module.exports = {
  route,
}
