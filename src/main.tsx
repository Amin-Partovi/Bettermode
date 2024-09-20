import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { PostDetailsPage, PostListPage } from "./pages";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostListPage />} />

          <Route path="/:id" element={<PostDetailsPage />} />
        </Routes>
      </BrowserRouter>
      ,
    </ApolloProvider>
  </StrictMode>
);
