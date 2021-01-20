import App from "../components/App"
import InfoBox from "../components/InfoBox"
import Header from "../components/Header"
import Submit from "../components/Submit"
import PostList from "../components/PostList"
import { useUser } from "@auth0/nextjs-auth0"

const IndexPage = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        <App>
          <Header />
          <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
          <Submit />
          <PostList />
        </App>
      </div>
    )
  }
  return <a href="/api/auth/login">Login</a>
}

export default IndexPage
