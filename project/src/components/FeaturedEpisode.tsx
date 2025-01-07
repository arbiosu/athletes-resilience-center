import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle } from 'lucide-react'

interface FeaturedEpisodeProps {
  title: string
  description: string
  description2: string
  imageUrl: string
  duration: string
  date: string
  link: string
}

const FeaturedEpisode: React.FC<FeaturedEpisodeProps> = ({
  title,
  description,
  description2,
  imageUrl,
  duration,
  date,
  link,
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Featured Episode</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <CardDescription className="text-sm text-gray-500 mb-4">
              {description}
            </CardDescription>
            <CardDescription className="text-sm text-gray-500 mb-4">
              {description2}
            </CardDescription>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{duration}</span>
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
      <Link href={link} className="w-full">
        <Button className="w-full">
          <PlayCircle className="mr-2 h-4 w-4" /> Listen on Spotify
        </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default FeaturedEpisode

