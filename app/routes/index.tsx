import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/start'
import { getPlaylists } from '../lib/api'
import { Suspense, useState } from 'react'

const queryOptionsPlaylists = queryOptions({
  queryKey: ['playlists'],
  queryFn: useServerFn(getPlaylists),
  staleTime: Infinity
});

export const Route = createFileRoute('/')({
  component: Home,
  loader: ({ context }) => {
    // context.queryClient.prefetchQuery(queryOptionsPlaylists)
  }
})

function Home() {
  const [show, setShow] = useState(false);
  return (
    <Suspense fallback="Loading...">
      {show && <Playlists />}
      <button onClick={() => setShow(!show)}>Toggle</button>
    </Suspense>
  )
}

function Playlists() {
  const { data: playlists } = useSuspenseQuery(queryOptionsPlaylists)

  return playlists.map(playlist => (
    <li key={playlist.id}><Link to="/playlists/$id" params={{ id: playlist.id }}>{playlist.title}</Link></li>
  ))
}