import { MutationCache, QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { routeTree } from './routeTree.gen'

export function createRouter() {
    const queryClient: QueryClient = new QueryClient({
        mutationCache: new MutationCache({
            onSettled: () => {
                if (queryClient.isMutating() === 1) {
                    return queryClient.invalidateQueries()
                }
            },
        }),
    })

    return routerWithQueryClient(
        createTanStackRouter({
            routeTree,
            context: { queryClient },
            defaultPreload: 'intent',
        }),
        queryClient,
    )
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}
