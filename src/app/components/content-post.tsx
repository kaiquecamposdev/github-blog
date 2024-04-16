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
  const { issuesPosts } = useContext(IssuesPostsContext)
  const params = useParams<QueryParamsPropsType>()

  const formattedIssuesPosts = issuesPosts.filter((item) => {
    return item.id === Number(params[':id'])
  })

  console.log(formattedIssuesPosts)

  return (
    <>
      {formattedIssuesPosts.map((data) => {
        return (
          <Markdown className="leading-[160%] text-base-text">
            {data.body}
          </Markdown>
        )
      })}
    </>
  )
}
