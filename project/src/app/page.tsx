import Hero from "@/components/Hero"
import FeaturedEpisode from "@/components/FeaturedEpisode"
import { AboutArc, AboutArcProps, AboutHostProps } from "@/components/About"

export default function Home() {
  "use client";
  // TODO: link up to Spotify API to grab most recent episode
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

  const episodeDescription = `Matt and Brandon dive into the transition from being a player 
                            to stepping into the role of a coach. Whether you're a former athlete looking to 
                            make the leap or a young coach just starting out, they explore the mental shifts 
                            required to succeed in this new leadership role. They discuss the challenges of 
                            building trust and open communication with players, especially when navigating 
                            personal relationships early on in your coaching career. They’ll also touch on 
                            the importance of emotional intelligence in coaching and how to manage your own 
                            mental habits to stay focused and effective, even in the face of adversity. 
                            Discover how to balance your leadership style with your coaching philosophy, 
                            and how skill development isn’t just for players—it’s an ongoing process for coaches too.
                            Plus, they share key advice for aspiring coaches on how to grow and thrive in 
                            this dynamic and rewarding profession. Tune in for insights on coaching through 
                            tough moments, learning from your experiences, and setting yourself up for 
                            long-term success.`

  return (
    <div>
      <Hero />
      <FeaturedEpisode 
        title="The Pilot"
        description={episodeDescription}
        imageUrl="/logoWithNames.jpg"
        duration="6 minutes 42 seconds"
        date="Dec 13, 2024"
        link="https://open.spotify.com/episode/5OUtSgVb56z8ay4NoYsuCL?si=ddefeae00b2046fa"
        />
      <div className="py-20">
        <AboutArc props={props} />
      </div>
    </div>
  )
}