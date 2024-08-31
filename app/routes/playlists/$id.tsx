import { queryOptions, useSuspenseQueries } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Suspense } from 'react'
import { getPlaylist, getSongs } from '../../lib/api'

export const playlistQueryOptions = (id: string) =>
    queryOptions({
        queryKey: ['playlist', id],
        queryFn: () => getPlaylist(id),
        staleTime: Infinity
    });

export const songsQueryOptions = () =>
    queryOptions({
        queryKey: ['songs'],
        queryFn: getSongs,
        staleTime: Infinity
    });

export const Route = createFileRoute('/playlists/$id')({
    component: Playlist,
    loader: ({ context, params }) => {
        context.queryClient.prefetchQuery(playlistQueryOptions(params.id))
        context.queryClient.prefetchQuery(songsQueryOptions())
    }
})

function Playlist() {
    return (
        <Suspense fallback="Loading...">
            <PlaylistItem />
        </Suspense>
    )
}

function PlaylistItem() {
    const { id } = Route.useParams();
    const [{ data: playlist }, { data: songs }] = useSuspenseQueries({
        queries: [playlistQueryOptions(id), songsQueryOptions()]
    });

    return (
        <div>
            <h1>{playlist.title}</h1>
            <img src={playlist.cover} width="100" />
            <h2>Songs</h2>
            <ul>
                {songs.map(song => (
                    <li key={song.id}>{song.title}</li>
                ))}
            </ul>
            <p><Link to="/">Back</Link></p>
        </div>
    )
}