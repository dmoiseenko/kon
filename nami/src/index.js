const fastify = require("fastify")({
  logger: true,
})
const { Client } = require("pg")

fastify.post("/add_todo", async (request, reply) => {
  const client = new Client({
    connectionString:
      "postgres://zoru:srE7uSxFwjbOwv4zK4iaFgRTbwqv1Mwz6wZqh24wRLQ66@zoru:5432/kon",
  })

  await client.connect()

  const res = await client.query("SELECT NOW();")

  return { id: "world" }
})

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
