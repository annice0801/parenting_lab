import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FBF3E4] flex flex-col items-center py-10 px-4 gap-8">
      <article className="w-full max-w-2xl flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <Link href="/blog" className="self-start text-sm text-[#8a6d46] hover:underline">
            ← 回文章列表
          </Link>
          <span className="text-4xl">{post.emoji}</span>
          <span className="text-xs font-bold text-white bg-[#E8A87C] rounded-full px-3 py-1">
            {post.ageRange}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#6B4A2E] text-center">
            {post.title}
          </h1>
          <p className="text-[#8a6d46] text-center max-w-xl">{post.summary}</p>
        </div>

        <div className="flex flex-col gap-6">
          {post.sections.map((section) => (
            <section
              key={section.heading}
              className="bg-white/80 border-4 border-[#F1DDBB] rounded-3xl p-5 sm:p-6 flex flex-col gap-2"
            >
              <h2 className="text-lg font-bold text-[#6B4A2E]">{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-[#5c4630] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-[#6B4A2E] text-center">
            🎯 建議活動
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {post.activities.map((activity) => (
              <div
                key={activity.title}
                className="flex flex-col gap-1 bg-[#DCEFC7]/60 border-4 border-[#DCEFC7] rounded-2xl p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activity.icon}</span>
                  <h3 className="font-bold text-[#3f5c2e]">{activity.title}</h3>
                </div>
                <p className="text-sm text-[#4f6b3d]">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/blog"
          className="self-center rounded-full bg-[#7BB97A] hover:bg-[#6AA869] text-white font-bold px-6 py-3 shadow-md transition active:scale-95"
        >
          📚 看更多文章
        </Link>
      </article>
    </div>
  );
}
