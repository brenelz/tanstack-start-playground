import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { addPlaylist, getPlaylists, removePlaylist } from '../lib/api'
import { Suspense } from 'react';

export const playlistsQueryOptions = () =>
  queryOptions({
    queryKey: ['playlists'],
    queryFn: getPlaylists,
    staleTime: Infinity
  });

export const Route = createFileRoute('/')({
  component: Home,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(playlistsQueryOptions())
  }
})

function Home() {
  return (
    <Suspense fallback="Loading Playlists...">
      <Playlists />
    </Suspense>
  )
}

function Playlists() {
  const { data: playlists } = useSuspenseQuery(playlistsQueryOptions());

  const addPlaylistFn = useMutation({
    mutationFn: addPlaylist,
  });

  const removePlaylistFn = useMutation({
    mutationFn: removePlaylist
  });

  return (
    <>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}><Link to="/playlists/$id" params={{ id: playlist.id }}>{playlist.title}</Link></li>
        ))}
      </ul>
      <p>
        <button onClick={() => addPlaylistFn.mutate()}>
          Add Playlist
        </button>
      </p >
      <p>
        <button onClick={() => removePlaylistFn.mutate()}>
          Remove Playlist
        </button >
      </p>
    </>
  );
}