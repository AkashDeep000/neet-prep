import Link from "next/link";
import getTopics from "@/utils/getTopics";
import getChapters from "@/utils/getChapters";

type Params = { subject: "biology" | "physics" | "chemistry"; chapter: string };


export const dynamicParams = false;
export async function generateStaticParams() {
  const subjects = ['biology', 'chemistry', 'physics'] as const
  
  const routes:Params[] = []
  subjects.forEach(subject => {
    const chapters = getChapters({ subject });
    chapters.forEach(chapter => routes.push({
      subject,
      chapter: encodeURIComponent(chapter.name)
    }))
  })  
  return routes
}

export default async function Home({ params }: { params: Params }) {
  const { subject, chapter } = params;
  const topics = getTopics({ subject, chapter });

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <div className="grid gap-3">
      {topics.map(({ name, total }) => {
        return (
          <Link key={name} href={`/${subject}/chapter-wise/${chapter}/${name}`}>
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
