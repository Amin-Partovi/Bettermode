import { InView } from "react-intersection-observer";

import { Card, Loading } from "../components/elements";
import { PostCard } from "../components/fragments";
import {
  useDislikePostMutation,
  useLikePostMutation,
  usePostsQuery,
} from "../queries";
import { strings } from "../utils/strings";
import Layout from "../components/layouts/Layout";

const PAGE_SIZE = 5;

const postsParams = {
  hasParent: false,
  limit: PAGE_SIZE,
  memberId: import.meta.env.VITE_MEMBER_ID,
};

function PostListPage() {
  const { data, fetchMore, loading, error } = usePostsQuery(postsParams);

  const { likePost } = useLikePostMutation(postsParams);
  const { dislikePost } = useDislikePostMutation(postsParams);

  function handleFetchMore(inView: boolean, cursor: string) {
    if (!inView) {
      return;
    }

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
    return <Loading />;
  }

  if (error || !data) {
    return <span>{strings.ERROR}</span>;
  }

  return (
    <Layout>
      <main className="grid grid-cols-4  gap-8  items-start">
        <Card className="col-span-1 min-h-96 hidden lg:block">
          <span className="text-3xl font-semibold">{strings.MENU}</span>
        </Card>

        <div className="col-span-4 md:col-span-3 lg:col-span-2 flex flex-col gap-8 ">
          {data.memberPosts.edges?.map((edge, index, arr) => (
            <InView
              key={index}
              onChange={(inView) => {
                handleFetchMore(inView, edge.cursor);
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
    </Layout>
  );
}

export default PostListPage;
