import Link from "next/link";
import getTopics from "@/utils/getTopics";
import getChapters from "@/utils/getChapters";
import getParts from "@/utils/getParts";

type Params = { subject: "biology" | "physics" | "chemistry"; chapter: string; topic: string };

// export const dynamicParams = false;
// export async function generateStaticParams({ params }: { params: Params }) {
//   const { subject, chapter } = params;
//   const chapters = getChapters({ subject });
//   return chapters.map((chapter) => {
//     return {
//       subject: "biology",
//       chapter: chapter.name,
//     };
//   });
// }

export default async function Home({ params }: { params: Params }) {
  const { subject, chapter, topic } = params;
  const parts = getParts({ subject, chapter, topic });

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="grid gap-3">
      {parts.map(({ name, total }) => {
        return (
          <Link key={name} href={`/${subject}/${chapter}/${topic}/${name}`}>
             <div className="w-full space-y-2 p-4 rounded capitalize bg-accent hover:outline hover:outline-slate-400 ">
                <p className="text-lg">{name}</p>
                <p className="text-sm">Total: {total}</p>
              </div>
          </Link>
        );
      })}
    </div>
    </div>
  );
}
