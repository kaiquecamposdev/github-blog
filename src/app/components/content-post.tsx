'use client'

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams } from 'next/navigation'
import { useContext } from 'react'
import Markdown from 'react-markdown'
import { IssuesPostsContext } from '../context/issues-posts-provider'

interface QueryParamsPropsType extends Params {
  ':id': number
}

export function ContentPost() {
  const {
    issuesPosts: { items },
  } = useContext(IssuesPostsContext)
  const params = useParams<QueryParamsPropsType>()

  const data = items.find((item) => {
    return item.id === params[':id']
  })

  return (
    <>
      <Markdown className="leading-[160%] text-base-text">
        {data?.body}
      </Markdown>
    </>
  )
}
