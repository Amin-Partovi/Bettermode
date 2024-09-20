import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="bg-primary-50 w-full h-full flex justify-center items-center">
      <LoaderIcon width={32} height={32} className="animate-spin" />
    </div>
  );
};

export default Loading;
