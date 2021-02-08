const fastify = require("fastify")({
  logger: true,
})
const { pg_connection_string } = require("./config")

fastify.register(require('fastify-postgres'), {
  connectionString: pg_connection_string
})
fastify.register(require('./route/add_todo').route)
fastify.register(require('./route/edit_todo').route)
fastify.register(require('./route/remove_todo').route)

const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
