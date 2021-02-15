import { gql, useQuery } from "@apollo/client"
import ErrorMessage from "./ErrorMessage"
import Todo from "./Todo"

export const ALL_TODO_QUERY = gql`
  {
    todo {
      id
      text
    }
  }
`

export default function TodoList() {
  const {
    loading,
    error,
    data,
  } = useQuery(ALL_TODO_QUERY)

  if (error) return <ErrorMessage message="Error loading todo." />
  if (loading) return <div>Loading</div>

  return (
    <section>
      <ul>
        {data?.todo.map((t) => (
          <li key={t.id}>
            <Todo todo={t}/>
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
          content: "";
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}
