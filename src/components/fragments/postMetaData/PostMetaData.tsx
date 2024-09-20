import moment from "moment";
import { strings } from "../../../utils/strings";
import { Avatar } from "../../elements";
import { Node } from "../postCard/PostCard";

type Owner = NonNullable<Node["owner"]> | undefined | null;

interface Props {
  owner: Owner;
  publishedAt: string;
}

const PostMetaData = ({ owner, publishedAt }: Props) => {
  if (!owner?.member) {
    return;
  }

  return (
    <div className="flex gap-4">
      {owner?.member?.profilePicture?.__typename === "Image" && (
        <Avatar
          src={owner.member.profilePicture.url}
          alt={owner.member.name ?? ""}
        />
      )}

      <div className="flex flex-col justify-between">
        <span className="font-semibold text-base">{owner.member.name}</span>

        <div className="flex gap-2 items-center">
          <span className="text-gray-500 ">
            {moment(publishedAt).fromNow()}
          </span>

          <div className="w-1 h-1 bg-gray-300 rounded-full" />

          <span className="text-gray-500 ">{strings.POSTED_ARTICLE}</span>
        </div>
      </div>
    </div>
  );
};

export default PostMetaData;
