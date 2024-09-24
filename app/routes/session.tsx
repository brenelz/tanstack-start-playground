import { createFileRoute } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/start'
import { getHeader } from 'vinxi/http'

const getSession = createServerFn('GET', () => {
    console.log(getHeader('User-Agent'))
})

export const Route = createFileRoute('/session')({
    component: SessionComponent,
})

function SessionComponent() {
    const getSessionFn = useServerFn(getSession);
    return <div><button onClick={() => getSessionFn()}>Click me</button></div>;
}
