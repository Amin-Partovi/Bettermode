import { useParams } from "react-router-dom";
import { usePostDetailsQuery } from "../queries";

const PostDetailsPage = () => {
  const { id } = useParams();
  const { data } = usePostDetailsQuery(id as string);
  console.log(data);

  return <div>PostDetailsPage</div>;
};

export default PostDetailsPage;
