const opts = {
  schema: {
    body: {
      type: "object",
      required: ["input"],
      properties: {
        input: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
            },
          },
        },
      },
    },
    response: {
      200: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },
    },
  },
}

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
