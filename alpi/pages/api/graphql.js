import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0"

export default withApiAuthRequired(async function products(req, res) {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ["read:all"],
  })

  const response = await fetch(process.env.NAMI_GRAPHQL_URL, {
    method: req.method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(req.body)
  })

  const data = await response.json()
  res.status(response.status).json(data)
})
