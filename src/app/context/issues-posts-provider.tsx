'use client'

import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

const GITHUB_USERNAME = 'kaiquecamposdev'
const GITHUB_REPO = 'github-blog'

interface IssuePost {
  total_count: number
  items: [
    {
      id: number
      repository_url: string
      title: string
      body: string
      comments: number
      created_at: string
      user: {
        login: string
      }
    },
  ]
}

interface IssuesPostsContextProps {
  issuesPosts: IssuePost
  handleSearch: (query: string) => void
}

interface IssuesPostsContextType {
  children: React.ReactNode
}

export const IssuesPostsContext = createContext({} as IssuesPostsContextProps)

export function IssuesPostsProvider({ children }: IssuesPostsContextType) {
  const [search, setSearch] = useState('')
  const [issuesPosts, setIssuesPosts] = useState<IssuePost>(() => {
    const emptyPost = {
      total_count: 0,
      items: [
        {
          id: 0,
          repository_url: '',
          title: '',
          body: '',
          comments: 0,
          created_at: '',
          user: {
            login: '',
          },
        },
      ],
    }

    const initialStateInJSON = localStorage?.getItem('github-blog:posts')

    if (initialStateInJSON === null) {
      return emptyPost
    }

    const initialState = JSON.parse(initialStateInJSON)

    return initialState || emptyPost
  })
  function handleSearch(query: string) {
    console.log(search)

    setSearch(query)
  }
  async function fetchIssuesPosts(query: string) {
    const url = `https://api.github.com/search/issues`
    const params = `%20repo:${GITHUB_USERNAME}/${GITHUB_REPO}`
    const response = await axios.get(url, {
      params: {
        q: query + params,
      },
    })
    const data = response.data as IssuePost

    localStorage?.setItem('github-blog:posts', JSON.stringify(data))

    return data
  }

  useEffect(() => {
    fetchIssuesPosts(search).then((data) => {
      setIssuesPosts(data)
    })
  }, [])

  return (
    <IssuesPostsContext.Provider
      value={{
        issuesPosts,
        handleSearch,
      }}
    >
      {children}
    </IssuesPostsContext.Provider>
  )
}
