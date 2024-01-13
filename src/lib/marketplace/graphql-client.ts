// lib/client.js
import { HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {
    NextSSRApolloClient,
    NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";

export const { getClient } = registerApolloClient(() => {
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: new HttpLink({
            uri: "/api/marketplace/graphql",
        }),
    });
});