import { gql, useQuery } from '@apollo/client'
import ErrorMessage from './ErrorMessage'

export const ALL_POSTS_QUERY = gql`
  {
    todo {
      id
      text
    }
  }
`

export default function PostList() {
  const { loading, error, data } = useQuery(
    ALL_POSTS_QUERY,
  )

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading) return <div>Loading</div>

  const { todo: todos } = data

  return (
    <section>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <span>{todo.text}</span>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}
