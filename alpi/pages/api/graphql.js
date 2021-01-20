import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0"

export default withApiAuthRequired(async function products(req, res) {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ["read:all"],
  })

  const response = await fetch("https://ha1.dev.dmoiseenko.me/v1/graphql", {
    method: req.method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(req.body)
  })

  const data = await response.json()
  res.status(response.status).json(data)
})
