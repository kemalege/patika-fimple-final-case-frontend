import { Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center space-y-5">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </div>
  );
};

export default Loading;
