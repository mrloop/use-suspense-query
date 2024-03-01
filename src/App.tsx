import { Suspense } from 'react'
import './App.css'
import Sup from './Sup'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading A && AA...</div>}>
          <Sup name={'A'}><Sup name={'B'}><Sup name={'C'}><div>contents</div></Sup></Sup></Sup>
          <Sup name={'AA'} ms={3000}/>
        </Suspense>
        <Suspense fallback={<div>Loading BB...</div>}>
          <Sup name={'BB'} ms={1000}/>
        </Suspense>
        <Suspense fallback={<div>Loading CC...</div>}>
          <Sup name={'CC'}><Sup name={'CC'} ms={Infinity}></Sup></Sup>
        </Suspense>
 
      </QueryClientProvider>
    </>
  )
}

export default App
