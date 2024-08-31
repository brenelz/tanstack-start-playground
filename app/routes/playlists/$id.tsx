import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/start'
import { Suspense } from 'react'
import { getPlaylist } from '../../lib/api'

export const Route = createFileRoute('/playlists/$id')({
    component: Playlist
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
    const getPlaylistFn = useServerFn(getPlaylist)
    const { data: playlist } = useSuspenseQuery({
        queryKey: ['playlist', id],
        queryFn: () => getPlaylistFn(id)
    })

    return (
        <>
            <h1>{playlist.title}</h1>
            <img src={playlist.cover} width="100" />
            <p><Link to="/">Back</Link></p>
        </>
    )
}