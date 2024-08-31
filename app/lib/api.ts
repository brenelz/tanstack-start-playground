import { createServerFn } from "@tanstack/start";
import { playlists, songs } from "./data";
import { redirect } from "@tanstack/react-router";

export const getPlaylists = createServerFn('GET', async () => {
    return playlists;
});

export const getPlaylist = createServerFn('GET', async (id: string) => {
    return playlists.find(playlist => playlist.id === id)
});

export const getSongs = createServerFn('GET', async () => {
    return songs;
});

export const addPlaylist = createServerFn('POST', async () => {
    playlists.push({
        id: "6",
        title: "Cow songs",
        cover:
            "https://res.cloudinary.com/dp3ppkxo5/image/upload/v1693776474/spotify-astro/R-15112137-1586815179-1911_fsyl58.jpg",
        artists: ["Saint Hilda", "Canada Buffalo"],
    });

    return redirect({
        to: '/playlists/$id',
        params: { id: '6' }
    })
});

export const removePlaylist = createServerFn('POST', async () => {
    playlists.pop();

    return redirect({
        to: '/'
    })
});