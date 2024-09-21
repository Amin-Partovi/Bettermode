import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Card, Loading } from "../components/elements";

import { usePostDetailsQuery } from "../queries";
import { strings } from "../utils/strings";
import { PostContentFactory, PostMetaData } from "../components/fragments";
import Layout from "../components/layouts/Layout";

const PostDetailsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = usePostDetailsQuery(id as string);

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <span>{strings.ERROR}</span>;
  }
  return (
    <Layout>
      <main className="grid grid-cols-4 h-full gap-8 items-start">
        <Card className="col-span-1 min-h-96 hidden md:block">
          <span className="text-3xl font-semibold">{strings.MENU}</span>
        </Card>

        <Card className="col-span-4 md:col-span-3 flex flex-col gap-6">
          <Link to="/" className="flex gap-2 ">
            <ArrowLeft />
            <span>{strings.MY_ARTICLES}</span>
          </Link>

          <PostMetaData
            owner={data.post.owner}
            publishedAt={data.post.publishedAt}
          />

          {data.post.fields?.map((field, index) => (
            <PostContentFactory
              field={field}
              key={index}
              id={id as string}
              showDetails
            />
          ))}
        </Card>
      </main>
    </Layout>
  );
};

export default PostDetailsPage;
