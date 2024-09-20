import {
  ArrowLeft,
  LoaderIcon
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../components/elements";
import ContentFactory from "../components/fragments/postCard/ContentFactory";
import { usePostDetailsQuery } from "../queries";
import { strings } from "../utils/strings";

const PostDetailsPage = () => {
  const { id } = useParams();
  const { data, loading } = usePostDetailsQuery(id as string);

  if (loading) {
    return (
      <div className="bg-primary-50 w-full h-full flex justify-center items-center">
        <LoaderIcon width={32} height={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <main className="grid grid-cols-4 bg-primary-50 h-full gap-8 p-4 sm:p-8 items-start">
      <Card className="col-span-1 min-h-96 hidden md:block">
        <span className="text-3xl font-semibold">{strings.MENU}</span>
      </Card>

      <Card className="col-span-4 md:col-span-3 flex flex-col gap-6">
        <Link to="/" className="flex gap-2 ">
          <ArrowLeft />
          <span>{strings.MY_ARTICLES}</span>
        </Link>
        {data?.post.fields?.map((field, index) => (
          <ContentFactory field={field} key={index} id={id as string} />
        ))}
      </Card>
    </main>
  );
};

export default PostDetailsPage;
