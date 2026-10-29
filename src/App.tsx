import useSWR from 'swr'
import type { Post } from './types'
import './App.css'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const fetcher = async (url: string): Promise<Post[]> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Fetch failed (${response.status})`)
  }
  return response.json()
}

function App() {
  const { data, error, isLoading, mutate } = useSWR<Post[]>(POSTS_URL, fetcher)

  if (isLoading) {
    return (
      <main className="page">
        <header className="page-header">
          <h1>Posts</h1>
          <p>JSONPlaceholder · SWR</p>
        </header>
        <p className="status status-loading" role="status">
          Caricamento post…
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="page">
        <header className="page-header">
          <h1>Posts</h1>
          <p>JSONPlaceholder · SWR</p>
        </header>
        <div className="status status-error" role="alert">
          <p>Impossibile caricare i post.</p>
          <p className="status-detail">
            {error instanceof Error ? error.message : 'Errore sconosciuto'}
          </p>
          <button type="button" onClick={() => mutate()}>
            Riprova
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>Posts</h1>
        <p>
          {data?.length ?? 0} post da JSONPlaceholder · SWR
        </p>
      </header>
      <section className="posts" aria-label="Elenco post">
        {data?.map((post) => (
          <article key={post.id} className="post">
            <span className="post-id">#{post.id}</span>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
