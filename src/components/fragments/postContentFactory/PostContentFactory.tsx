import { Link } from "react-router-dom";
import { GetMemberPostQuery } from "../../../__generated__/graphql";
import { Badge } from "../../elements";
import classNames from "classnames";

export type Field = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<GetMemberPostQuery["memberPosts"]["edges"]>[number]
    >["node"]
  >["fields"]
>[number];

interface Props {
  field: Field;
  id: string;
  showDetails?: boolean;
}

const PostContentFactory = ({ field, id, showDetails = false }: Props) => {
  if (!field || !field.key) return null;

  const renderCoverImage = () => {
    const image = field.relationEntities?.medias?.[0];
    if (image?.__typename === "Image" && image.url) {
      return <img src={image.url} alt={field.key} className="rounded-lg" />;
    }
    return null;
  };

  const renderTitle = () => (
    <Link to={`/${id}`}>
      <span className="text-2xl font-semibold">{field.value}</span>
    </Link>
  );

  const renderContent = () => {
    if (!field.value) return null;
    return (
      <div
        className={classNames({ "line-clamp-6": !showDetails })}
        dangerouslySetInnerHTML={{ __html: field.value }}
      />
    );
  };

  const renderFeaturedBadge = () => <Badge>{field.key}</Badge>;

  switch (field.key) {
    case "coverImage":
      return renderCoverImage();
    case "title":
      return renderTitle();
    case "content":
      return renderContent();
    case "featured":
      return renderFeaturedBadge();
    default:
      return null;
  }
};

export default PostContentFactory;
