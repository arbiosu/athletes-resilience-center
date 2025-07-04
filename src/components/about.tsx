import Image from 'next/image';

interface HostProps {
  name: string;
  experience: string;
  bio: string;
  image: string;
}

const hosts: HostProps[] = [
  {
    name: 'Brandon Zachary',
    experience: 'Former pitcher...etc',
    bio: 'Insert bio here',
    image: '/logo-no-bg.png',
  },
  {
    name: 'Matt Owens',
    experience: 'Former pitcher...etc',
    bio: 'Insert bio here',
    image: '/logo-no-bg.png',
  },
];

function Host({ name, experience, bio, image }: HostProps) {
  return (
    <div className='flex flex-col items-center space-y-4 text-center'>
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className='rounded-full object-cover'
      />
      <div>
        <h3 className='mb-4 text-xl font-semibold'>{name}</h3>
        <p className='mb-4 font-semibold'>{experience}</p>
        <p className=''>{bio}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className='font-jetbrains container mx-auto px-4'>
      <h2 className='mb-12 text-center text-3xl font-bold'>About the Show</h2>
      <div className='mx-auto mb-16 max-w-3xl'>
        <p className='mb-6 text-lg'>
          The <strong>Athlete&apos;s Resilience Center</strong> Podcast is
          dedicated to{' '}
          <strong>
            normalizing the conversation around mental performance in sports,
            coaching, and the transitions athletes face after their careers.
          </strong>{' '}
          Each episode explores the mental challenges anyone associated with
          sports may encounter, both on and off the field.
        </p>
        <p className='mb-6 text-lg'>
          Whether you&apos;re an{' '}
          <strong>
            athlete, coach, or someone navigating life after sports,
          </strong>{' '}
          this podcast offers conversations centered around helping you build
          resilience at every stage of your athletic journey.
        </p>
        <p className='mb-6 text-lg'>
          <strong>Tune in </strong> for candid conversations from two people
          passionate about mental performance development.
        </p>
      </div>
      <h3 className='mb-8 text-center text-2xl font-semibold'>
        Meet your Hosts
      </h3>
      <div className='grid gap-12 md:grid-cols-2'>
        {hosts.map((host) => (
          <Host
            name={host.name}
            experience={host.experience}
            bio={host.bio}
            image={host.image}
            key={host.name}
          />
        ))}
      </div>
    </section>
  );
}
