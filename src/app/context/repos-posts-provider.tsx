'use client'

import { updateInitialState } from '@/utils/update-initial-state'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const GITHUB_USERNAME = 'kaiquecamposdev'

interface RepoPost {
  id: number
  name: string
  html_url: string
  created_at: string
  user: {
    login: string
  }
  stargazers_count: number
  forks: number
  watchers: number
}

interface ReposPostsContextProps {
  reposPosts: RepoPost[]
  handleSearch: (query: string) => void
  search: string
}

interface ReposPostsContextType {
  children: React.ReactNode
}

export const ReposPostsContext = createContext({} as ReposPostsContextProps)

export function ReposPostsProvider({ children }: ReposPostsContextType) {
  const [search, setSearch] = useState('')
  const [reposPosts, setReposPosts] = useState<RepoPost[]>(
    updateInitialState(
      [
        {
          id: 0,
          name: '',
          html_url: '',
          created_at: '',
          user: {
            login: '',
          },
          stargazers_count: 0,
          forks: 0,
          watchers: 0,
        },
      ],
      'github-blog:posts',
    ),
  )
  function handleSearch(query: string) {
    setSearch(query)
  }
  async function fetchReposPosts() {
    const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos`
    const response = await axios.get(url)

    const data = response.data as RepoPost[]

    localStorage?.setItem('github-blog:posts', JSON.stringify(data))

    return data
  }

  useEffect(() => {
    fetchReposPosts().then((data) => {
      setReposPosts(data)
    })
  }, [])

  return (
    <ReposPostsContext.Provider
      value={{
        reposPosts,
        handleSearch,
        search,
      }}
    >
      {children}
    </ReposPostsContext.Provider>
  )
}
