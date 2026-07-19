import { Suspense } from "react";
import { Preview } from "@/src/page/preview";

export const Page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const params = (await searchParams);
  const id = Number(params.id);

  return (
    <Suspense>
      <Preview id={id} />
      <textarea>{}</textarea>
    </Suspense>
  );
};

export default Page;
