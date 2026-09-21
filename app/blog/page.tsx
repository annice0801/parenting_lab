import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#FBF3E4] flex flex-col items-center py-10 px-4 gap-8">
      <div className="w-full max-w-3xl flex flex-col items-center gap-2">
        <Link href="/" className="self-start text-sm text-[#8a6d46] hover:underline">
          ← 回首頁
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#6B4A2E] text-center">
          🧠 3-6 歲發展小百科
        </h1>
        <p className="text-[#8a6d46] text-center max-w-xl">
          學前幼兒在 3 到 6 歲階段，大腦與身體會經歷快速的變化。這裡整理了各年齡段的發展重點，以及可以在家陪孩子玩的建議活動。
        </p>
      </div>

      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-5">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex flex-col gap-2 bg-white/80 hover:bg-white border-4 border-[#F1DDBB] rounded-3xl p-5 shadow transition hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl">{post.emoji}</span>
              <span className="text-xs font-bold text-white bg-[#E8A87C] rounded-full px-3 py-1">
                {post.ageRange}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#6B4A2E]">{post.title}</h2>
            <p className="text-sm text-[#8a6d46] line-clamp-3">{post.summary}</p>
            <span className="mt-auto text-sm font-bold text-[#DF9764]">閱讀全文 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
