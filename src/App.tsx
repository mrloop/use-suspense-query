import { Suspense } from 'react'
import './App.css'
import Sup from './Sup'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <section>
          <h2>Nested</h2>
          <Suspense fallback={<div className="loading">Loading Nested...</div>}>
            <Sup name={'Nested A'}>
              <Sup name={'Nested B'}>
                <Sup name={'Nested C'}><div>Nested Contents</div></Sup>
              </Sup>
            </Sup>
          </Suspense>
        </section>

        <section>
          <h2>Parallel</h2>
          <Suspense fallback={<div className="loading">Loading Parallel...</div>}>
            <Sup name={'Parallel A'} ms={1000}/>
            <Sup name={'Parallel B'} ms={2000}/>
            <Sup name={'Parallel C'} ms={1000}/>
          </Suspense>
        </section>

        <section>
          <h2>Cached</h2>
          <h3>Fast load first</h3>
          <Suspense fallback={<div className="loading">Loading Cached...</div>}>
            <Sup name={'Cached A'} ms={4000}><Sup name={'Cached A'} ms={100000}></Sup></Sup>
            <Sup name={'Cached A'} ms={10000}></Sup>
          </Suspense>

          <h3>Slow load first</h3>
          <Suspense fallback={<div className="loading">Loading Cached...</div>}>
            <Sup name={'Cached B'} ms={10000}></Sup>
            <Sup name={'Cached B'} ms={4000}><Sup name={'Cached B'} ms={100000}></Sup></Sup>
          </Suspense>
        </section>

      </QueryClientProvider>
    </>
  )
}

export default App
