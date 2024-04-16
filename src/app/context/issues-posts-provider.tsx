'use client'

import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

const GITHUB_USERNAME = 'kaiquecamposdev'
const GITHUB_REPO = 'github-blog'

interface IssuePost {
  id: number
  repository_url: string
  title: string
  body: string
  comments: number
  created_at: string
  user: {
    login: string
  }
}

interface IssuesPostsContextProps {
  issuesPosts: IssuePost[]
}

interface IssuesPostsContextType {
  children: React.ReactNode
}

export const IssuesPostsContext = createContext({} as IssuesPostsContextProps)

export function IssuesPostsProvider({ children }: IssuesPostsContextType) {
  const [issuesPosts, setIssuesPosts] = useState<IssuePost[]>(() => {
    const initialStateInJSON = localStorage.getItem('github-blog:posts')

    if (initialStateInJSON === null) {
      return
    }

    const initialState = JSON.parse(initialStateInJSON)

    return initialState
  })

  async function fetchIssuesPosts() {
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/issues`
    const response = await axios.get(url)
    const data = response.data as IssuePost[]

    localStorage.setItem('github-blog:posts', JSON.stringify(data))

    return data
  }

  useEffect(() => {
    if (issuesPosts) {
      return
    }
    fetchIssuesPosts().then((data) => {
      setIssuesPosts(data)
    })
  }, [])

  return (
    <IssuesPostsContext.Provider
      value={{
        issuesPosts,
      }}
    >
      {children}
    </IssuesPostsContext.Provider>
  )
}
