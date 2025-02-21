const spotifyId = "4ffm2AA2kGffaH6TbMzilZ"
const endpoint = `https://api.spotify.com/v1/shows/${spotifyId}/episodes`

async function getSpotifyAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials"
        })
    })

    return response.json()
}

// TODO: Add limit parameter
export async function getEpisodes(limit: number) {
    try {
        const { access_token } = await getSpotifyAccessToken()
        const response = await fetch(`${endpoint}?limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        if (!response.ok) {
            throw new Error(`Spotify API Error: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error in getEpisodes: ", error)
        throw error
    }
}