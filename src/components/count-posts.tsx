'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { useContext } from 'react'

export function CountPosts() {
  const { reposPosts, search } = useContext(ReposPostsContext)

  console.log(reposPosts)

  const formattedReposPost = reposPosts.filter((repo) => {
    if (!repo.name || !repo.description) {
      return repo
    }

    return (
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <span className="text-sm text-base-span">
      {formattedReposPost.length + ' ' || 0 + ' '} Publicações
    </span>
  )
}
