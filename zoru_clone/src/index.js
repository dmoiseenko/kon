const fastify = require("fastify")({
  logger: true,
})
const { Client } = require("pg")
const logger = require("pino")({
  prettyPrint: {
    colorize: true,
    translateTime: "SYS:standard",
  },
})

fastify.get("/", async (request, reply) => {
  return
})

async function start() {
  try {
    await fastify.listen(80, "0.0.0.0")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

async function main() {
  const client = new Client({
    connectionString:
      "postgres://postgres:Supersecurepassword@localhost:39827/postgres",
  })

  await client.connect()

  logger.info("Drop kon1 database(if exists)")
  await client.query("DROP DATABASE IF EXISTS kon1;")

  logger.info("Start cloning kon database into kon1 database")
  await client.query("CREATE DATABASE kon1 TEMPLATE kon;")
  logger.info("Finish cloning kon database into kon1 database")

  await start()
}

main()
