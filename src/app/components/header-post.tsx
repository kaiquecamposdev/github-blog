'use client'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faAngleLeft,
  faArrowUpRightFromSquare,
  faCalendarDay,
  faComment,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { IssuesPostsContext } from '../context/issues-posts-provider'

interface QueryParamsPropsType extends Params {
  ':id': number
}

export function Header() {
  const [loading, setLoading] = useState<boolean>(true)
  const params = useParams<QueryParamsPropsType>()
  const { issuesPosts } = useContext(IssuesPostsContext)

  useEffect(() => {
    if (issuesPosts) {
      setLoading(false)
    }
  }, [])

  const formattedIssuesPosts = issuesPosts.filter((item) => {
    return item.id === Number(params[':id'])
  })

  const filteredPost = formattedIssuesPosts[0]
  const createdAtDate = new Date(filteredPost.created_at)

  return (
    <>
      <header className="mt-[-87px] flex w-full flex-col items-center rounded-lg bg-base-profile p-8 shadow-xl">
        <div className="flex w-full justify-between">
          <Link href="/" className="text-xs font-bold uppercase text-base-blue">
            <FontAwesomeIcon icon={faAngleLeft} width={12} height={12} /> Voltar
          </Link>
          <Link
            href={filteredPost.repository_url || '#'}
            className="flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-base-blue"
          >
            {loading ? (
              <Skeleton
                width={60}
                height={16}
                baseColor="var(--base-text)"
                className="opacity-50"
              />
            ) : (
              <>
                Ver no github
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  width={12}
                  height={12}
                />
              </>
            )}
          </Link>
        </div>
        <h1 className="w-full pt-5 text-2xl font-bold leading-[160%] text-base-text">
          {filteredPost.title}
        </h1>
        <div className="flex w-full">
          <ul className="flex gap-6 text-base-subtitle">
            <li className="flex items-center gap-2 text-base-label">
              <FontAwesomeIcon
                width={18}
                height={18}
                className="text-base-label"
                icon={faGithub}
              />
              {loading ? (
                <Skeleton
                  width={120}
                  height={16}
                  baseColor="var(--base-text)"
                  className="opacity-50"
                />
              ) : (
                <p>{filteredPost.user.login}</p>
              )}
            </li>
            <li className="flex items-center gap-2 text-base-label">
              <FontAwesomeIcon
                width={18}
                height={18}
                className="text-base-label"
                icon={faCalendarDay}
              />
              {loading ? (
                <Skeleton
                  width={120}
                  height={16}
                  baseColor="var(--base-text)"
                  className="opacity-50"
                />
              ) : (
                <time>
                  {formatDistance(createdAtDate, new Date(), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </time>
              )}
            </li>
            <li className="flex items-center gap-2 text-base-label">
              <FontAwesomeIcon
                width={18}
                height={18}
                className="text-base-label"
                icon={faComment}
              />
              {loading ? (
                <Skeleton
                  width={120}
                  baseColor="var(--base-text)"
                  className="opacity-50"
                />
              ) : (
                <p>{filteredPost.comments + ' '} comentários</p>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}
