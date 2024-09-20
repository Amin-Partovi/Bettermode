import { BellIcon, SendIcon, ThumbsUp } from "lucide-react";
import { GetMemberPostQuery } from "../../../__generated__/graphql";
import { strings } from "../../../utils/strings";
import { Badge, Button, Card, Input } from "../../elements";
import PostContentFactory from "../postContentFactory/PostContentFactory";
import PostMetaData from "../postMetaData/PostMetaData";
import React from "react";

export type Node = NonNullable<
  NonNullable<
    NonNullable<GetMemberPostQuery["memberPosts"]["edges"]>[number]
  >["node"]
>;

interface Props {
  post: Node;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
}
const PostCard = ({ post, onLike, onDislike }: Props) => {
  const isLiked = post.reactions?.length && post.reactions?.length > 0;
  return (
    <Card className="flex flex-col gap-6">
      <PostMetaData owner={post.owner} publishedAt={post.publishedAt} />

      {post.fields?.map((field, index) => (
        <PostContentFactory field={field} key={index} id={post.id} />
      ))}

      {post.tags?.map((tag, index) => (
        <Badge key={index}>{tag.title}</Badge>
      ))}

      <div className="flex gap-4 flex-col sm:flex-row">
        {isLiked ? (
          <Button
            isFluid
            iconLeft={<ThumbsUp fill="gold" />}
            onClick={() => onDislike(post.id)}
          >
            {strings.LIKED}
          </Button>
        ) : (
          <Button
            isFluid
            iconLeft={<ThumbsUp />}
            onClick={() => onLike(post.id)}
          >
            {strings.LIKE}
          </Button>
        )}

        <Button isFluid iconLeft={<BellIcon />}>
          {strings.FOLLOWING}
        </Button>

        <Button isFluid iconLeft={<SendIcon />}>
          {strings.SHARE}
        </Button>
      </div>

      <Input placeholder={strings.COMMENT_PLACEHOLDER} />
    </Card>
  );
};

export default React.memo(PostCard);
