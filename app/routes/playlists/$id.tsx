import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playlists/$id')({
    component: () => <div>Hello /playlists/$id!</div>
})