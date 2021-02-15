import App from "../components/App"
import Header from "../components/Header"

const AboutPage = () => (
  <App>
    <Header />
    <article>
      <h1>The Idea Behind This Example</h1>
      <p>
        <a href="https://www.apollographql.com/client/">Apollo</a> is a GraphQL
        client that allows you to easily query the exact data you need from a
        GraphQL server. In addition to fetching and mutating data, Apollo
        analyzes your queries and their results to construct a client-side cache
        of your data, which is kept up to date as further queries and mutations
        are run, fetching more results from the server.
      </p>
    </article>
  </App>
)

export default AboutPage
