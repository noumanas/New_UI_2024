import Cookies from 'universal-cookie';
import { config } from "../enviorment/enviorment";

const TOKEN_KEY = '_secret_spotify_token';


export const destroySpotifySession = () => {
    const cookies = new Cookies();
    cookies.remove(TOKEN_KEY)
}
export const createSpotifySession = (token) => {
    const cookies = new Cookies();
    cookies.set(TOKEN_KEY, token);
}
export const getSpotifySession = () => {
    const cookies = new Cookies();
    return cookies.get(TOKEN_KEY);
}


export function getHeaders(contentType) {
    let tokenData = getSpotifySession();

    let headers = {
        'Content-Type': contentType ?? 'application/json'
    }
    if (tokenData) {
        headers['Authorization'] = `Bearer ${tokenData}`;
    }

    return headers;
}

export function geSongStatstHeaders(contentType) {
    let headers = {
        'Accept': '*/*',
        'apikey': config.SONGS_STATS_API_KEY,
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
    }
    return headers;
}

function handleAuthorization(header) {
    if (!(header['Authorization'])) {

    }
}
export async function _fetchSongState(url, method = 'GET', body, contentType) {
    const headers = geSongStatstHeaders(contentType)
    console.log(headers);
    return fetch(url, {
        headers,
        body,
        method
    }).then(async res => {
        const json = await res.json();

        if (res.ok) {
            return json;
        } else {
            return Promise.reject(json);
        }
    }).catch(function (err) {
        return Promise.reject(err);
    })
}


export async function _fetch(url, method = 'GET', body, contentType, checkAuthToken) {
    const headers = getHeaders(contentType);
    checkAuthToken && handleAuthorization(headers)
    return fetch(url, {
        headers,
        body,
        method
    }).then(async res => {

        const json = await res.json();

        if (res.ok) {
            return json;
        } else {
            return Promise.reject(json);
        }
    })
        .catch(function (err) {
            return Promise.reject(err);
        });
}

export const _fetchToken = async () => {
    const result = await fetch(config.SPOTIFY_AUTH_BASE_URL + '/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(config.SPOTIFY_CLIENT_ID + ':' + config.SPOTIFY_CLIENT_SECRETS)
        },
        body: 'grant_type=client_credentials',
    });
    const data = await result.json();
    createSpotifySession(data.access_token);
}