import Link from "next/link";

export const metadata = {
  title: "二項式積木屋 | ann-tools",
};

export default function BinomialCubePage() {
  return (
    <div className="min-h-screen bg-[#F8F1E4] flex flex-col items-center py-6 px-4 gap-3">
      <div className="w-full max-w-2xl flex flex-col items-center gap-1">
        <Link
          href="/"
          className="self-start text-sm text-[#9C8368] hover:underline"
        >
          ← 回首頁
        </Link>
      </div>
      <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-lg bg-[#EFE1C5]">
        <iframe
          src="/binomial-cube.html"
          title="二項式積木屋"
          className="w-full border-0 block"
          style={{ height: "1150px" }}
        />
      </div>
    </div>
  );
}
