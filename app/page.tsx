import { Home } from "@/src/page/home";
import { Suspense } from "react";

export const Page = async () => {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
};

export default Page;
