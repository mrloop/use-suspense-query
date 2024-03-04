import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense } from 'react'
import secondsSinceStart from "./timeSinceStart"

const timeout = function (ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

const query = function({ name, ms }: {name: string, ms: number }) {
  return async function queryFn() {
    console.log(`fetching: ${name} at ${secondsSinceStart()}s`);
    await timeout(ms);
    console.log(`fetched: ${name} (${ms}ms) at ${secondsSinceStart()}s`);
    return `Loaded ${name} at ${secondsSinceStart()}s`
  }
}

export default function Sup({ children, name, ms = 2000 }: { children?: any, name: string, ms?: number }) {

  console.log(`Rendering ${name}`)

  const { data } = useSuspenseQuery({
     queryKey: [name],
     queryFn: query({name, ms}),
     staleTime: Infinity,
     refetchOnWindowFocus: false,
  })

  return (
    <div>
     {data}
     <Suspense fallback={<div className="loading">{name} loading children...</div>}>
       {children}
     </Suspense>
    </div>
  )
}
