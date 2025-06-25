const SPOTIFY_SHOW_ID = '4ffm2AA2kGffaH6TbMzilZ';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';

interface SpotifyAccesTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: string;
}
export interface SpotifySimplifiedEpisode {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  id: string;
  release_date: string;
  name: string;
}

async function getSpotifyAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Missing Spotify credentials');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64'
  );

  const res = await fetch(SPOTIFY_AUTH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  if (!res.ok)
    throw new Error(`Failed to get Spotify access token: ${res.status}`);

  const data: SpotifyAccesTokenResponse = await res.json();
  return data.access_token;
}

export async function getEpisodes(limit: number = 50) {
  const token = await getSpotifyAccessToken();
  const url = `${SPOTIFY_API_BASE_URL}/shows/${SPOTIFY_SHOW_ID}/episodes?limit=${limit}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to get episodes from Spotify`);

  const data = await res.json();

  return data;
}
