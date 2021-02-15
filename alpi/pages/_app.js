import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { UserProvider } from '@auth0/nextjs-auth0'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  const { user } = pageProps

  return (
    <UserProvider user={user}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  )
}
