import { gql, useMutation } from "@apollo/client"
import { ALL_TODO_QUERY } from "./TodoList"

export default function Submit() {
  const { handleSubmit, loading } = useSubmitTodo()

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add todo</h1>
      <input placeholder="text" name="text" type="text" required />
      <button type="submit" disabled={loading}>
        Submit
      </button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  )
}

export const ADD_TODO_MUTATION = gql`
  mutation AddTodo($text: String!) {
    add_todo(text: $text) {
      id
      todo {
        id
        text
      }
    }
  }
`

function useSubmitTodo() {
  const [addTodo, { loading }] = useMutation(ADD_TODO_MUTATION)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const text = formData.get("text")
    form.reset()

    addTodo({
      variables: { text },
      update(cache, { data }) {
        const newTodoFromResponse = data.add_todo.todo
        const existingTodo = cache.readQuery({
          query: ALL_TODO_QUERY,
        })

        cache.writeQuery({
          query: ALL_TODO_QUERY,
          data: {
            todo: [...existingTodo.todo, newTodoFromResponse],
          },
        })
      },
    })
  }

  return { handleSubmit, loading}
}
