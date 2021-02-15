import { gql, useMutation } from "@apollo/client"
import { ALL_TODO_QUERY } from "./TodoList"

export default function Todo(props) {
  const { todo } = props
  const { handleClick, loading } = useDeleteTodo(todo.id)

  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={handleClick} disabled={loading}>
        X
      </button>
      <style jsx>{`
        span {
          margin-right: 10px;
        }
        div {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodo($id: String!) {
    remove_todo(id: $id) {
      id
    }
  }
`

function useDeleteTodo(id) {
  const [deleteTodo, { loading }] = useMutation(DELETE_TODO_MUTATION)

  const handleClick = () => {
    deleteTodo({
      variables: { id },
      update(cache) {
        const { todo: todos } = cache.readQuery({
          query: ALL_TODO_QUERY,
        })

        const indexToRemove = todos.findIndex((todo) => todo.id === id)
        const newTodos = todos.slice()
        newTodos.splice(indexToRemove, 1)

        cache.writeQuery({
          query: ALL_TODO_QUERY,
          data: {
            todo: newTodos,
          },
        })
      },
    })
  }

  return { handleClick, loading }
}
