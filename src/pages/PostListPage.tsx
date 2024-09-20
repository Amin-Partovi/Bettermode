import { InView } from "react-intersection-observer";

import {
  useDislikePostMutation,
  useLikePostMutation,
  usePostsQuery,
} from "../queries";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

function PostListPage() {
  const postsParams = {
    hasParent: false,
    limit: PAGE_SIZE,
    memberId: import.meta.env.VITE_MEMBER_ID,
  };

  const { data, fetchMore } = usePostsQuery(postsParams);

  const { likePost } = useLikePostMutation(postsParams);
  const { dislikePost } = useDislikePostMutation(postsParams);

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
            <Link key={edge.node.id} to={`/${edge.node.id}`}>
              <div
                role="button"
                className="border border-red-400 m-40 text-lg"
                ref={index === arr.length - 1 ? ref : null}
              >
                {edge.node.title} - {edge.node.reactions?.length}
                <button
                  onClick={
                    edge.node.reactions?.length &&
                    edge.node.reactions?.length > 0
                      ? () => dislikePost(edge.node.id)
                      : () => likePost(edge.node.id)
                  }
                  className="border border-blue-400 p-2"
                >
                  react
                </button>
              </div>
            </Link>
          )}
        </InView>
      ))}
    </div>
  );
}

export default PostListPage;
