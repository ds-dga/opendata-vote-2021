import { useMemo } from "react"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { offsetLimitPagination } from "@apollo/client/utilities"
let apolloClient

const GQL_URI = process.env.GQL_URI || "https://ds.10z.dev/v1/graphql"

const httpLink = new HttpLink({ uri: GQL_URI })

/* const authMiddleware = new ApolloLink(async (operation, forward) => {
  let headers = {
    "winter-falcon-client": "webapp",
    "winter-falcon-social-app": "email",
    "winter-falcon-uid": localStorage.getItem("token") || "",
    "winter-falcon-jwt": localStorage.getItem("token") || "",
  }
  // add the authorization to the headers
  operation.setContext({
    headers,
  })

  return forward(operation)
}) */

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        dataset: offsetLimitPagination(["where"]),
      },
    },
  },
})

function createApolloClient() {
  return new ApolloClient({
    // ssrMode: typeof window === "undefined", // set to true for SSR
    // link: concat(authMiddleware, httpLink),
    link: httpLink,
    // link: new HttpLink({ uri: process.env.GRAPHQL_URI }),
    cache,
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}

export const initOffsetVars = {
  limit: 15,
  offset: 0,
}
