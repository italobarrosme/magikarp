import { SpinnerIcon } from "@/modules/common/components/Icons/SpinnerIcon";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SpinnerIcon className="animate-spin w-10 h-10" />
    </div>
  );
};

export default Loading;
