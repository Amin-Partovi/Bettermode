import { Link } from "react-router-dom";
import { GetMemberPostQuery } from "../../../__generated__/graphql";
import { Badge } from "../../elements";

export type Field = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<GetMemberPostQuery["memberPosts"]["edges"]>[number]
    >["node"]
  >["fields"]
>[number];

const ContentFactory = ({ field, id }: { field: Field; id: string }) => {
  switch (field?.key) {
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
        <div
          className="line-clamp-6"
          dangerouslySetInnerHTML={{ __html: field.value ?? "" }}
        />
      );
    case "featured":
      return <Badge>{field.key}</Badge>;
    default:
      return;
  }
};

export default ContentFactory;
