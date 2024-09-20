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
  switch (field.key) {
    case "coverImage":
      return (
        <>
          {field.relationEntities?.medias[0].__typename === "Image" && (
            <img
              src={field.relationEntities?.medias[0].url}
              alt={field.key}
              className="rounded-lg"
            />
          )}
        </>
      );
    case "title":
      return (
        <Link to={`/${id}`}>
          <span className="text-2xl font-semibold">{field.value}</span>
        </Link>
      );
    case "content":
      return (
        <>
          {field.value ? (
            <div
              className={classNames({ "line-clamp-6": !showDetails })}
              dangerouslySetInnerHTML={{ __html: field.value }}
            />
          ) : null}
        </>
      );
    case "featured":
      return <Badge>{field.key}</Badge>;
    default:
      return;
  }
};

export default PostContentFactory;
