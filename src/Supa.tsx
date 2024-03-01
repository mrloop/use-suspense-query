import { useSuspenseQuery } from "@tanstack/react-query"
import { useId } from 'react'

const timeout = function (ms: number) {
  return new Promise(r => setTimeout(r, ms))
}
const queryFn = async function() {
  await timeout(1000)
  console.log('there');
  return 'hello'
}

export default function Supa({ children }: { children?: any }) {

  const id = useId();
  const { data } = useSuspenseQuery({
     queryKey: [id],
     queryFn,
  })

  return (
    <div>
      {data}
    </div>
  )
}

