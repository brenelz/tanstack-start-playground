import { createFileRoute } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/start'
import { useSession } from 'vinxi/http'

const getSession = createServerFn('GET', async () => {
    const test = await useSession({
        password:
            process.env.SESSION_SECRET ?? "areallylongsecretthatyoushouldreplace",
    });

})

export const Route = createFileRoute('/session')({
    component: SessionComponent,
})

function SessionComponent() {
    const getSessionFn = useServerFn(getSession);
    return <div><button onClick={() => getSessionFn()}>Click me</button></div>;
}
