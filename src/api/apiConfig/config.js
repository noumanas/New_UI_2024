import { config as URLconfig } from "../../enviorment/enviorment";

const SPOTIFY_BASE_URL = URLconfig.SPOTIFY_CLIENT_BASE_URL;

const config = {
    spotify: {
        artist: (spotify_id) => `${SPOTIFY_BASE_URL}/artists/${spotify_id}`,
        search: (name) => `${SPOTIFY_BASE_URL}/search?q=${name}&type=artist`,
        topTracks: (spotify_id) => `${SPOTIFY_BASE_URL}/artists/${spotify_id}/top-tracks?market=GB`,
        similarArtist: (spotify_id) => `${SPOTIFY_BASE_URL}/artists/${spotify_id}/related-artists`,
        topSongOfTheWeek: (playlist_id) => `${SPOTIFY_BASE_URL}/playlists/${playlist_id}`,
        playSong: `${SPOTIFY_BASE_URL}/me/player/play`,
        pauseSong: `${SPOTIFY_BASE_URL}/me/player/pause`,
    }
}

export { config };