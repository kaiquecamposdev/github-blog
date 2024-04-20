'use client'

import { useContext } from 'react'
import { ReposPostsContext } from '../context/repos-posts-provider'

export function CountPosts() {
  const { reposPosts } = useContext(ReposPostsContext)

  return (
    <span className="text-sm text-base-span">
      {reposPosts.length + ' '}
      Publicações
    </span>
  )
}
