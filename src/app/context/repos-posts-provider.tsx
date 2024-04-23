'use client'

import { updateInitialState } from '@/utils/update-initial-state'
import axios from 'axios'
import { createContext, useEffect, useMemo, useState } from 'react'

export const GITHUB_USERNAME = 'kaiquecamposdev'
const PER_PAGE = 10

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
  content_readme: string
}

interface IReposPostsContextProps {
  reposPosts: IRepoPost[]
  handleSearch: (query: string) => void
  search: string
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
  const fetchReadmeReposPaginated = useMemo(
    () =>
      async (page = 1): Promise<IRepoPost[]> => {
        const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${PER_PAGE}&page=${page}`
        const response = await axios.get(url)
        const repositories = response.data as IRepoPost[]

        const readmeRequests = repositories.map((repo) =>
          axios.get(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`,
          ),
        )
        const readmeResponses = await Promise.all(readmeRequests)
          .then((data) => data)
          .catch(() => [])

        const updatedRepos = repositories.map((repo, index) => ({
          ...repo,
          readme: readmeResponses[index].data.content || '',
        }))

        return [...updatedRepos, ...(await fetchReadmeReposPaginated(page + 1))]
      },
    [GITHUB_USERNAME, PER_PAGE],
  )

  useEffect(() => {
    if (!reposPosts) {
      fetchReadmeReposPaginated().then((repos) => {
        setReposPosts(repos)
      })
    }
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
