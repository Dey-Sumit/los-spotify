import { AxiosError } from "axios";

const catchErrors = (fn: () => Promise<void>) => {
  return function (...args: any[]) {
    //@ts-ignore
    return fn(...args).catch((err: AxiosError) => {
      console.log(err.message);
    });
  };
};

export { catchErrors };
