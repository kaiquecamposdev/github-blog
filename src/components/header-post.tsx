'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faAngleLeft,
  faArrowUpRightFromSquare,
  faCalendarDay,
  faCodeFork,
  faEye,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'

interface IQueryParams extends Params {
  id: number
}

export function Header() {
  const [loading, setLoading] = useState<boolean>(true)
  const { reposPosts } = useContext(ReposPostsContext)

  const params = useParams<IQueryParams>()

  useEffect(() => {
    if (reposPosts) {
      setLoading(false)
    }

    setLoading(true)
  }, [])

  const formattedReposPosts = reposPosts.find((item) => {
    return item.id === Number(params.id)
  })

  return (
    <>
      <header className="mt-[-87px] flex w-full flex-col items-center rounded-lg bg-profile p-8 shadow-xl">
        <div className="flex w-full justify-between">
          <Link href="/" className="text-xs font-bold uppercase text-primary">
            <FontAwesomeIcon icon={faAngleLeft} className="h-3 w-3" /> Voltar
          </Link>
          <Link
            href={formattedReposPosts?.html_url || '#'}
            className="flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-blue"
          >
            {loading ? (
              <Skeleton className="h-4 w-14 bg-muted" />
            ) : (
              <>
                Ver no github
                <FontAwesomeIcon
                  className="h-3 w-3"
                  icon={faArrowUpRightFromSquare}
                />
              </>
            )}
          </Link>
        </div>
        <h1 className="w-full pt-5 text-2xl font-bold leading-[160%] text-primary">
          {formattedReposPosts?.name}
        </h1>
        <div className="flex w-full">
          <ul className="flex gap-6 text-subtitle">
            <li className="flex items-center gap-2 text-label">
              <FontAwesomeIcon className="h-4 w-4 text-label" icon={faGithub} />
              {loading ? (
                <Skeleton className="h-4 w-28 bg-muted" />
              ) : (
                <p>{formattedReposPosts?.owner.login}</p>
              )}
            </li>
            <li className="flex items-center gap-2 text-label">
              <FontAwesomeIcon
                className="h-4 w-4 text-primary"
                icon={faCalendarDay}
              />
              {loading ? (
                <Skeleton className="h-4 w-28 bg-muted" />
              ) : (
                <time>
                  {formatDistance(
                    formattedReposPosts?.created_at || new Date(),
                    new Date(),
                    {
                      addSuffix: true,
                      locale: ptBR,
                    },
                  )}
                </time>
              )}
            </li>
            <li className="flex items-center gap-2 text-label">
              <FontAwesomeIcon className="h-4 w-4 text-label" icon={faStar} />
              {loading ? (
                <Skeleton className="w-28" />
              ) : (
                <p>{formattedReposPosts?.stargazers_count + ' '} estrelas</p>
              )}
            </li>
            <li className="flex items-center gap-2 text-label">
              <FontAwesomeIcon className="h-4 w-4" icon={faCodeFork} />
              {loading ? (
                <Skeleton className="w-28" />
              ) : (
                <p>{formattedReposPosts?.forks + ' '} forks</p>
              )}
            </li>
            <li className="flex items-center gap-2 text-label">
              <FontAwesomeIcon className="h-4 w-4" icon={faEye} />
              {loading ? (
                <Skeleton className="w-28" />
              ) : (
                <p>{formattedReposPosts?.watchers + ' '} visto</p>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}
