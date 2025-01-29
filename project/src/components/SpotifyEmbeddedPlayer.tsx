export default function SpotifyEmbeddedPlayer({ episodeId }: { episodeId: string }) {
    return (
        <div className="relative w-full pt-[56.25%]">
            <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://open.spotify.com/embed/episode/${episodeId}/video?utm_source=generator`}
            width={"624"}
            height={"351"}
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
            loading="lazy"
            >

            </iframe>
            
        </div>

    )
}
