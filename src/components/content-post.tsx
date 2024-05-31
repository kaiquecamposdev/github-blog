'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { Skeleton } from './ui/skeleton'

interface IQueryParamsProps extends Params {
  id: number
}

export function ContentPost() {
  const [loading, setLoading] = useState<boolean>(true)
  const { reposPosts } = useContext(ReposPostsContext)

  const params = useParams<IQueryParamsProps>()

  useEffect(() => {
    if (reposPosts) {
      setLoading(false)
    }
  }, [])

  const data = reposPosts.find((repo) => {
    return repo.id === Number(params.id)
  })

  return loading ? (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-4 w-[688px] bg-muted" />
      <Skeleton className="h-4 w-full bg-muted" />
      <Skeleton className="h-4 w-[738px] bg-muted" />
    </div>
  ) : (
    <>
      <Markdown className="leading-[160%] text-primary">
        {data?.description || 'Sem conteúdo'}
      </Markdown>
    </>
  )
}
