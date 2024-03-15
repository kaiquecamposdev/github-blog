'use client'

import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

interface IssuePost {
  id: number
  title: string
  body: string
  login: string
  comments: number
  created_at: string
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
    const url = `https://api.github.com/repos/kaiquecamposdev/github-blog/issues`
    const response = await axios.get(url)
    const data = response.data as IssuePost[]

    localStorage.setItem('github-blog:posts', JSON.stringify(data))

    return data
  }

  useEffect(() => {
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
