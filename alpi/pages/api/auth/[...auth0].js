import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        response_type: 'code',
        audience: 'https://dev.dmoiseenko/v1/graphql',
        scope: 'read:all'
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message)
    }
  }
})
