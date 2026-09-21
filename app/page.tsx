import About from "./_components/About";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import MomentBanner from "./_components/MomentBanner";
import Philosophy from "./_components/Philosophy";
import { SiteProvider } from "./_components/site-context";
import Subscribe from "./_components/Subscribe";

export default function Home() {
  return (
    <SiteProvider>
      <div className="flex min-h-screen flex-col bg-cream">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <Philosophy />
          <MomentBanner />
          <Subscribe />
        </main>
        <Footer />
      </div>
    </SiteProvider>
  );
}
