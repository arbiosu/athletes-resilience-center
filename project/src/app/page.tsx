import { NewHero } from "@/components/Hero"
import About from "@/components/About"
import Featured from "@/components/FeaturedEpisode"

export const revalidate = 432000; // revalidate every 5 days? crusty, need to figure this out!


export default function Home() {
  return (
    <div>
      <NewHero />
      <section className="py-20">
        <About />
      </section>
      <Featured />
    </div>
  );
};
