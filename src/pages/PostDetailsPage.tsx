import { useParams } from "react-router-dom";
import { usePostDetailsQuery } from "../queries";
import { Badge, Button, Card, Input } from "../components/elements";

const PostDetailsPage = () => {
  const { id } = useParams();
  const { data } = usePostDetailsQuery(id as string);
  console.log(data);

  return (
    <div>
      <Button isLoading>button</Button>
      <Badge>Not Featured</Badge>
      <Input placeholder="What are your thoughts?" />
      <Card>hiiiiiiiiiiiiii</Card>
    </div>
  );
};

export default PostDetailsPage;
