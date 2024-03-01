import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense, useId } from 'react'

const timeout = function (ms: number) {
  return new Promise(r => setTimeout(r, ms))
}
const queryFn = async function() {
  console.log('here');
  await timeout(2000)
  return 'hello'
}

export default function Sup({ children }: { children?: any }) {

  const id = useId();
  const { data } = useSuspenseQuery({
     queryKey: [id],
     queryFn, 
  })

  return (
    <div>
     <Suspense fallback={<div>loading {id}</div>}>
       {children}
     </Suspense>
     {data}
    </div>
  )
}

