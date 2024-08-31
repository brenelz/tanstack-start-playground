import { createServerFn } from "@tanstack/start";
import { playlists } from "./data";

export const getPlaylists = createServerFn('GET', async () => {
    await new Promise(r => setTimeout(r, 2000));

    return playlists;
});

export const getPlaylist = createServerFn('GET', async (id: string) => {
    await new Promise(r => setTimeout(r, 2000));

    return playlists.find(playlist => playlist.id === id)
});