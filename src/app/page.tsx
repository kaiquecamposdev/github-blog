'use client'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Header } from './components/header'

interface IssuesPostsResponseData {
  id: number
  created_at: string
  title: string
  body: string
}

export default function Home() {
  const [search, setSearch] = useState<string>('')
  const [posts, setPosts] = useState<IssuesPostsResponseData[]>([])

  async function fetchIssuesPosts() {
    const url = `https://api.github.com/repos/kaiquecamposdev/github-blog/issues`
    const response = await axios.get(url)
    const data = response.data as IssuesPostsResponseData[]

    localStorage.setItem('github-blog:posts', JSON.stringify(data))

    return data
  }

  useEffect(() => {
    fetchIssuesPosts()
      .then((data) => {
        const initialStateInJSON = localStorage.getItem('github-blog:posts')

        if (initialStateInJSON === null) {
          return
        }

        const initialState = JSON.parse(initialStateInJSON)

        setPosts(initialState)

        setPosts([...data])
      })
      .catch((err) => console.error(err))
  }, [fetchIssuesPosts, setPosts])

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="z-10 flex w-full max-w-main-content flex-col">
        <Header />
        <div className="flex flex-col gap-12 pt-[58px]">
          <section className="flex w-full flex-col gap-2">
            <div className="flex w-full justify-between">
              <strong className="text-lg font-bold text-base-subtitle">
                Publicações
              </strong>
              <span className="text-sm text-base-span">
                {0 + ' '}
                Publicações
              </span>
            </div>
            <div>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Buscar conteúdo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border-[1px] border-base-border bg-base-input px-4 py-3 text-base text-white placeholder:text-base-label"
              />
            </div>
          </section>
          <nav>
            <ul className="grid grid-cols-2 gap-8">
              {posts.map(({ id, title, body, created_at }, index) => {
                return (
                  <li
                    key={index}
                    className="h-full max-h-[260px] w-full max-w-[416px] cursor-pointer rounded-[10px] bg-base-post p-8"
                  >
                    <Link
                      className="flex h-full flex-col gap-5"
                      href={'#' && `post/${id}`}
                    >
                      <div className="flex gap-4">
                        <h1 className="text-xl font-bold text-base-title">
                          {'Não encontrado' && title}
                        </h1>
                        <time className="text-sm text-base-span">
                          {'00-00-0000' && created_at}
                        </time>
                      </div>
                      <p className="overflow-hidden text-base-text">
                        {'...' && body}
                      </p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  )
}
