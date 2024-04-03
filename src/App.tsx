import { Suspense } from 'react'
import './App.css'
import DelayedQuery from './DelayedQuery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <section className="section">
          <h2>Nested</h2>
          <Suspense fallback={<div className="loading">Loading Nested...</div>}>
            <DelayedQuery name={'Nested A'}>
              <DelayedQuery name={'Nested B'}>
                <DelayedQuery name={'Nested C'}><div>Nested Contents</div></DelayedQuery>
              </DelayedQuery>
            </DelayedQuery>
          </Suspense>
        </section>

        <section className="section">
          <h2>Parallel</h2>
          <Suspense fallback={<div className="loading">Loading Parallel...</div>}>
            <DelayedQuery name={'Parallel A'} ms={1000}/>
            <DelayedQuery name={'Parallel B'} ms={2000}/>
            <DelayedQuery name={'Parallel C'} ms={1000}/>
          </Suspense>
        </section>

        <section className="section">
          <h2>Cached</h2>
          <h3>Fast load first</h3>
          <Suspense fallback={<div className="loading">Loading Cached...</div>}>
            <DelayedQuery name={'Cached A'} ms={4000}><DelayedQuery name={'Cached A'} ms={100000}/></DelayedQuery>
            <DelayedQuery name={'Cached A'} ms={10000}></DelayedQuery>
          </Suspense>

          <h3>Slow load first</h3>
          <Suspense fallback={<div className="loading">Loading Cached...</div>}>
            <DelayedQuery name={'Cached B'} ms={10000}></DelayedQuery>
            <DelayedQuery name={'Cached B'} ms={4000}><DelayedQuery name={'Cached B'} ms={100000}/></DelayedQuery>
          </Suspense>
        </section>

      </QueryClientProvider>
    </>
  )
}

export default App
