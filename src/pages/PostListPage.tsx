import { InView } from "react-intersection-observer";

import { LoaderIcon } from "lucide-react";
import { Card } from "../components/elements";
import { PostCard } from "../components/fragments";
import {
  useDislikePostMutation,
  useLikePostMutation,
  usePostsQuery,
} from "../queries";
import { strings } from "../utils/strings";

const PAGE_SIZE = 5;

function PostListPage() {
  const postsParams = {
    hasParent: false,
    limit: PAGE_SIZE,
    memberId: import.meta.env.VITE_MEMBER_ID,
  };

  const { data, fetchMore, loading } = usePostsQuery(postsParams);

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

  if (loading) {
    return (
      <div className="bg-primary-50 w-full h-full flex justify-center items-center">
        <LoaderIcon width={32} height={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <main className="grid grid-cols-4 bg-primary-50 gap-8 p-4 sm:p-8 items-start">
      <Card className="col-span-1 min-h-96 hidden lg:block">
        <span className="text-3xl font-semibold">{strings.MENU}</span>
      </Card>

      <div className="col-span-4 md:col-span-3 lg:col-span-2 flex flex-col gap-8 ">
        {data?.memberPosts.edges?.map((edge, index, arr) => (
          <InView
            key={index}
            onChange={(inView) => {
              if (inView) handleFetchMore(edge.cursor);
            }}
          >
            {({ ref }) => (
              <div ref={index === arr.length - 2 ? ref : null}>
                <PostCard
                  post={edge.node}
                  onLike={likePost}
                  onDislike={dislikePost}
                />
              </div>
            )}
          </InView>
        ))}
      </div>

      <Card className="col-span-1 min-h-72 hidden md:block">
        <span className="text-3xl font-semibold">{strings.ABOUT}</span>
      </Card>
    </main>
  );
}

export default PostListPage;
