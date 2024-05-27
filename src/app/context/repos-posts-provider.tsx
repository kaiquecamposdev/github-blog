'use client'

import { updateInitialState } from '@/utils/update-initial-state'
import axios from 'axios'
import { createContext, useEffect, useMemo, useState } from 'react'

export const GITHUB_USERNAME = 'kaiquecamposdev'
export const PER_PAGE = 6

export interface IRepoPost {
  id: number
  name: string
  description: string
  html_url: string
  created_at: string
  owner: {
    login: string
  }
  stargazers_count: number
  forks: number
  watchers: number
}

interface IReposPostsContextProps {
  reposPosts: IRepoPost[]
  search: string
  indexThePage: number
  setIndexThePage: (index: number) => void
  handleSearch: (query: string) => void
}

interface IReposPostsContext {
  children: React.ReactNode
}

export const ReposPostsContext = createContext({} as IReposPostsContextProps)

export function ReposPostsProvider({ children }: IReposPostsContext) {
  const [search, setSearch] = useState('')
  const [indexThePage, setIndexThePage] = useState(0)
  const [reposPosts, setReposPosts] = useState<IRepoPost[]>(
    updateInitialState('github-blog:posts', [
      {
        id: 0,
        name: '',
        description: '',
        html_url: '',
        created_at: '',
        owner: {
          login: '',
        },
        stargazers_count: 0,
        forks: 0,
        watchers: 0,
      },
    ]),
  )

  const fetchReposPaginated = useMemo(
    () => async (): Promise<IRepoPost[]> => {
      const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos`

      const response = await axios.get(url)
      const repositories = response.data as IRepoPost[]

      localStorage?.setItem('github-blog:posts', JSON.stringify(repositories))

      return repositories
    },
    [GITHUB_USERNAME],
  )

  function handleSearch(query: string) {
    setSearch(query)
  }

  useEffect(() => {
    if (!reposPosts) {
      fetchReposPaginated()
        .then((repos) => {
          setReposPosts(repos)
        })
        .catch((err) => console.log(err))
    }
  }, [])

  return (
    <ReposPostsContext.Provider
      value={{
        reposPosts,
        search,
        indexThePage,
        setIndexThePage,
        handleSearch,
      }}
    >
      {children}
    </ReposPostsContext.Provider>
  )
}
