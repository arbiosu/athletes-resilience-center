import { NewHero } from "@/components/Hero"
import About from "@/components/About"
import Featured from "@/components/FeaturedEpisode"


export default function Home() {
  return (
    <div>
      <NewHero />
      <section className="py-20 bg-gray-50">
        <About />
      </section>
      <Featured />
    </div>
  )
}
