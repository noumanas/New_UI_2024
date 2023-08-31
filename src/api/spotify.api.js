import { _fetch } from "../utils/spotifyApiServiceHandler";
import { config } from "./apiConfig/config";

export async function getArtist(id) {
    return _fetch(config.spotify.artist(id), "GET", undefined, undefined, false);
}

export async function getSimilarArtist(id) {
    return _fetch(config.spotify.similarArtist(id), "GET", undefined, undefined, false);
}

export async function searchArtist(name) {
    return _fetch(config.spotify.search(name), "GET", undefined, undefined, false);
}

export async function artistTopTracks(id) {
    return _fetch(config.spotify.topTracks(id), "GET", undefined, undefined, false);
}

export async function getTopSongOfTheWeek(id) {
    return _fetch(config.spotify.topSongOfTheWeek(id), "GET", undefined, undefined, false);
}

export async function playSongFromSpotify(song) {
    return _fetch(config.spotify.playSong, "PUT", song, undefined, false);
}

export async function pauseSongFromSpotify() {
    return _fetch(config.spotify.pauseSong, "PUT", undefined, undefined, false);
}

export async function getTopSongsOfWeek(playlist_id) {
    return _fetch(config.spotify.topSongsOfWeek(playlist_id), "GET", undefined, undefined, false);
}