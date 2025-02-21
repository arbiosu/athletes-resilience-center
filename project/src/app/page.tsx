import { NewHero } from "@/components/Hero"
import About from "@/components/About"
import Featured from "@/components/FeaturedEpisode"


// revalidate once a week for the new featured episode
export const revalidate = 60 * 60 * 24 * 7


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
