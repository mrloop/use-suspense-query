import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense } from 'react'

const timeout = function (ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

const queryFn = async function({ name, ms }: {name: string, ms: number }) {
  console.log(`fetching: ${name}`);
  await timeout(ms);
  console.log(`fetched: ${name} (${ms}ms)`);
  return `loaded ${name}`
}

export default function Sup({ children, name, ms = 2000 }: { children?: any, name: string, ms?: number }) {

  console.log(`Rendering ${name}`)

  const { data } = useSuspenseQuery({
     queryKey: [name],
     queryFn: () => queryFn({name, ms}),
  })

  return (
    <div>
     {data}
     <Suspense fallback={<div>{name} loading children...</div>}>
       {children}
     </Suspense>
    </div>
  )
}
