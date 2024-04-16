'use client'

import { useContext } from 'react'
import { IssuesPostsContext } from '../context/issues-posts-provider'

export function CountPosts() {
  const { issuesPosts } = useContext(IssuesPostsContext)

  return (
    <span className="text-sm text-base-span">
      {issuesPosts.length + ' '}
      Publicações
    </span>
  )
}
