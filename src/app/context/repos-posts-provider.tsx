'use client'

import { updateInitialState } from '@/utils/update-initial-state'
import axios from 'axios'
import { createContext, useEffect, useMemo, useState } from 'react'

export const GITHUB_USERNAME = 'kaiquecamposdev'
export const PER_PAGE = 6

interface IRepoPost {
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
  handleSearch: (query: string) => void
  search: string
  handlePreviousPage: () => IRepoPost[]
  handleNextPage: () => IRepoPost[]
}

interface IReposPostsContext {
  children: React.ReactNode
}

export const ReposPostsContext = createContext({} as IReposPostsContextProps)

export function ReposPostsProvider({ children }: IReposPostsContext) {
  const [search, setSearch] = useState('')
  const [reposPosts, setReposPosts] = useState<IRepoPost[]>(
    updateInitialState('github-blog:posts'),
  )
  function handleSearch(query: string) {
    setSearch(query)
  }
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
  function handlePreviousPage() {
    return reposPosts.slice(reposPosts.length, PER_PAGE)
  }
  function handleNextPage() {
    return reposPosts.slice(PER_PAGE, reposPosts.length)
  }

  useEffect(() => {
    if (!reposPosts) {
      fetchReposPaginated()
        .then((repos) => {
          setReposPosts(repos)
        })
        .catch((err) => console.log(err))
    }
  }, [reposPosts])

  return (
    <ReposPostsContext.Provider
      value={{
        reposPosts,
        handleSearch,
        search,
        handlePreviousPage,
        handleNextPage,
      }}
    >
      {children}
    </ReposPostsContext.Provider>
  )
}
