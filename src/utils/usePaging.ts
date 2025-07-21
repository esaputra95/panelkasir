import { useSearchParams } from "react-router-dom";


const usePaging = () => {
  const [searchParams] = useSearchParams();

  const queryParams: Record<string, string> = {};

  searchParams.forEach((value: string, key: string | number) => {
    queryParams[key] = value;
  });

  return {
    queryParams,
  };
};

export default usePaging;
