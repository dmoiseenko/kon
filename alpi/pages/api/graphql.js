import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0"

export default withApiAuthRequired(async function products(req, res) {
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ["read:all"],
  })

  const response = await fetch("https://ha1.dev.dmoiseenko.me/v1/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    query: JSON.stringify({
      query: `
      {
          asd {
              asd
          }
      }
      `,
    }),
  })

  const data = await response.json()
  res.status(response.status).json(data)
})
