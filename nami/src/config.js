fs = require("fs")

let volume_root = ""
if (process.env["TELEPRESENCE_ROOT"]) {
  volume_root = process.env["TELEPRESENCE_ROOT"]
}

const pg_connection_string = fs.readFileSync(
  `${volume_root}/vault/secrets/database-config`,
  "utf8"
)

module.exports = {
  pg_connection_string
}
