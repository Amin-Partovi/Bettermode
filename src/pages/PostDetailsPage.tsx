import { useParams } from "react-router-dom";
import { usePostDetailsQuery } from "../queries";
import { Avatar, Badge, Button, Card, Input } from "../components/elements";

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
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzk92qOx7c5k5fybjVbUkwg6BGW_ptjgID9A&s" />
    </div>
  );
};

export default PostDetailsPage;
