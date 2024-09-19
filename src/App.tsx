import { InView } from "react-intersection-observer";
import "./App.css";
import { usePostsQuery } from "./queries";

const PAGE_SIZE = 10;

function App() {
  const { data, fetchMore } = usePostsQuery({
    hasParent: false,
    limit: PAGE_SIZE,
    memberId: import.meta.env.VITE_MEMBER_ID,
  });

  function handleFetchMore(cursor: string) {
    fetchMore({
      variables: {
        after: cursor,
      },
      updateQuery(prevQueryResult, { fetchMoreResult }) {
        return {
          memberPosts: {
            edges: [
              ...(prevQueryResult.memberPosts.edges ?? []),
              ...(fetchMoreResult.memberPosts.edges ?? []),
            ],
          },
        };
      },
    });
  }

  return (
    <div className="flex flex-col">
      {data?.memberPosts.edges?.map((edge, index, arr) => (
        <InView
          key={index}
          onChange={(inView) => {
            if (inView) handleFetchMore(edge.cursor);
          }}
        >
          {({ ref }) => (
            <div
              key={edge.node.id}
              className="border border-red-400 m-40 text-lg"
              ref={index === arr.length - 1 ? ref : null}
            >
              {edge.node.title}
            </div>
          )}
        </InView>
      ))}
    </div>
  );
}

export default App;
