import App from "../components/App"
import Header from "../components/Header"
import Submit from "../components/Submit"
import TodoList from "../components/TodoList"
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
            <TodoList />
          </div>
        )}
      </App>
    </div>
  )
}

export default IndexPage
