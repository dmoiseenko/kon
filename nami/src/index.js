const { v4: uuidv4 } = require("uuid")
const fastify = require("fastify")({
  logger: true,
})
const { Client } = require("pg")
fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)

let connection_string = ""
let volume_root = ""
if (process.env["TELEPRESENCE_ROOT"]) {
  volume_root = process.env["TELEPRESENCE_ROOT"]
}

fastify.post("/add_todo", async (request, reply) => {
  const client = new Client({
    connectionString: connection_string,
  })

  const id = uuidv4()
  const text = request.body.input.text

  await client.connect()

  const res = await client.query(
    "INSERT INTO zoru.todo VALUEs($1, $2) RETURNING *;",
    [id, text]
  )

  return { id: res.rows[0].id }
})

const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0")

    connection_string = await readFile(
      `${volume_root}/vault/secrets/database-config`,
      "utf8"
    )
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
