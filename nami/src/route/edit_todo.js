const opts = {
  schema: {
    body: {
      type: "object",
      required: ["input"],
      properties: {
        input: {
          type: "object",
          required: ["id", "text"],
          properties: {
            id: {
              type: "string",
            },
            text: {
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
