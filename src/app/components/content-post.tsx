'use client'

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams } from 'next/navigation'
import { useContext } from 'react'
import Markdown from 'react-markdown'
import { ReposPostsContext } from '../context/repos-posts-provider'

interface IQueryParamsProps extends Params {
  ':id': number
}

export function ContentPost() {
  const { reposPosts } = useContext(ReposPostsContext)
  const params = useParams<IQueryParamsProps>()

  const data = reposPosts.find((repo) => {
    return repo.id === Number(params[':id'])
  })

  return (
    <>
      <Markdown className="leading-[160%] text-base-text">
        {data?.description && 'Não há conteúdo'}
      </Markdown>
    </>
  )
}
