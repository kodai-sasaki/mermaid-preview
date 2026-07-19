import { Suspense } from "react";
import { Preview } from "@/src/page/preview";

export const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const params = await searchParams;
  const id = Number(params.id);

  return (
    <Suspense>
      <Preview id={id} />
    </Suspense>
  );
};

export default Page;
