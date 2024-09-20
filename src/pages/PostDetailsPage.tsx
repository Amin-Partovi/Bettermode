import { useParams } from "react-router-dom";
import { usePostDetailsQuery } from "../queries";
import { Button } from "../components/elements";

const PostDetailsPage = () => {
  const { id } = useParams();
  const { data } = usePostDetailsQuery(id as string);
  console.log(data);

  return (
    <div>
      <Button isLoading>button</Button>
    </div>
  );
};

export default PostDetailsPage;
