const fastify = require("fastify")({
  logger: true,
})

fastify.post("/", async (request, reply) => {
  return { hello: "world" }
})

fastify.get("/", async (request, reply) => {
  return { hello: "world" }
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
