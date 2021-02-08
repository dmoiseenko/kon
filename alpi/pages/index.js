import App from "../components/App"
import Header from "../components/Header"
import Submit from "../components/Submit"
import PostList from "../components/PostList"
import { useUser } from "@auth0/nextjs-auth0"

const IndexPage = () => {
  const { user } = useUser()

  return (
    <div>
      <App>
        <Header />
        {user && (
          <div>
            <Submit />
            <PostList />
          </div>
        )}
      </App>
    </div>
  )
}

export default IndexPage
