import Hero from "@/components/Hero"
import { AboutArc, AboutArcProps, AboutHostProps } from "@/components/About"
import { NewFeaturedEpisode } from "@/components/FeaturedEpisode"

export default function Home() {
  "use client";
  const hostProps: AboutHostProps[] = [
    {
      name: "Brandon Zachary",
      bio: "Insert bio here tesihhiudu sdiuidufb isudcbhjdvbejbvedbikcb wiuef hieuf heirufhih isdcc ibueid bcskjnsdkjc nksdjvbckdjs vbkdsjbv kjbdksjvbkdjbvk",
      hostImg: "/logoNoBg.png",
    },
    {
      name: "Matt Owens",
      bio: "Insert bio here tesihhiudu sdiuidufb isudcbhjdv bejbvedbikcb wiuefhieu fheirufh ihisd ccibueid bcskjnsdkjcn ksdjvb ckdjsv  bkdsjbvkjbdk sjvbkdjbvk",
      hostImg: "/logoNoBg.png",
    },
  ]
  const props: AboutArcProps = {
      title: "The Athlete's Resilience Center Podcast",
      description: `is dedicated to normalizing 
      the conversation around mental performance in sports, coaching, and the transitions 
      athletes face after their careers. Each episode explores the mental challenges anyone 
      associated with sports may encounter, both on and off the field. Whether you're an athlete, 
      coach, or someone navigating life after sports, this podcast offers conversations 
      centered around helping you build resilience at every stage of your athletic journey.
      Tune in for candid conversations from two people passionate about mental performance development.`,
      hosts: hostProps,
  }
  
  return (
    <div>
      <Hero />
      <div className="py-10">
        <NewFeaturedEpisode />
      </div>
      <AboutArc props={props} />
    </div>
  )
}
