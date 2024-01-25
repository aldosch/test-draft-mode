import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";

type Content = {
  draft: boolean;
  title: string;
  description: string;
  image: string;
  link: string;
};

async function getContent() {
  const { isEnabled } = draftMode();

  const contentUrl = isEnabled
    ? "https://example-content-api.vercel.app/api/draft-content"
    : "https://example-content-api.vercel.app/api/content";

  // This line enables ISR, required for draft mode
  const res = await fetch(contentUrl, { next: { revalidate: 120 } });

  return res.json();
}

export default async function Page() {
  const { draft, title, description, image, link }: Content =
    await getContent();

  return (
    <main className="container m-4 mx-auto">
      <p className="dark:text-white text-center text-black">
        This page is{" "}
        <strong>{draft ? "in draft mode" : "not in draft mode"}</strong>.
      </p>
      <article className="isolate rounded-2xl pt-80 sm:pt-48 lg:pt-80 relative flex flex-col p-8 m-4 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={1000}
          height={1000}
          className="-z-10 absolute inset-0 object-cover w-full h-full"
        />
        <div className="-z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 absolute inset-0" />
        <div className="-z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10 absolute inset-0" />

        <h3 className="mt-3 text-4xl font-semibold leading-6 text-white">
          {title}
        </h3>
        <p className="max-w-96 mt-6 text-sm leading-6 text-white">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-end mt-3 overflow-hidden text-sm leading-6 text-gray-300">
          <Link href={link} target="_blank">
            Source
          </Link>
        </div>
      </article>
    </main>
  );
}
