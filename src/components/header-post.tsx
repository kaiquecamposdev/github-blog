'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faAngleLeft,
  faArrowUpRightFromSquare,
  faCalendarDay,
  faCode,
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
  }, [])

  const formattedReposPosts = reposPosts.find((item) => {
    return item.id === Number(params.id)
  })

  return (
    <>
      <header className="mt-[-87px] flex w-full flex-col gap-3 rounded-lg bg-profile p-8 shadow-xl">
        <div className="flex w-full justify-between">
          {loading ? (
            <>
              <Skeleton className="h-4 w-14 bg-muted" />
              <Skeleton className="h-4 w-14 bg-muted" />
            </>
          ) : (
            <>
              <Link
                href="/"
                className="text-xs font-bold uppercase text-blue hover:underline hover:underline-offset-[6px]"
              >
                <FontAwesomeIcon icon={faAngleLeft} className="h-3 w-3" />{' '}
                Voltar
              </Link>
              <Link
                href={formattedReposPosts?.html_url || '#'}
                target="_blank"
                className="flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-blue hover:underline hover:underline-offset-[6px]"
              >
                Ver no github
                <FontAwesomeIcon
                  className="h-3 w-3 text-blue"
                  icon={faArrowUpRightFromSquare}
                />
              </Link>
            </>
          )}
        </div>

        {loading ? (
          <Skeleton className="h-6 w-64 bg-muted" />
        ) : (
          <h1 className="w-full pt-4 text-2xl font-bold leading-[160%] text-primary">
            {formattedReposPosts?.name}
          </h1>
        )}

        <div className="flex w-full">
          <ul className="flex gap-6">
            <li className="flex items-center gap-2 text-muted">
              {loading ? (
                <Skeleton className="h-5 w-5 rounded-full bg-muted" />
              ) : (
                <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
              )}
              {loading ? (
                <Skeleton className="h-4 w-28 bg-muted" />
              ) : (
                <>{formattedReposPosts?.owner.login}</>
              )}
            </li>
            <li className="flex items-center gap-2 text-muted">
              {loading ? (
                <Skeleton className="h-5 w-5 rounded-full bg-muted" />
              ) : (
                <FontAwesomeIcon className="h-4 w-4" icon={faCode} />
              )}
              {loading ? (
                <Skeleton className="h-4 w-28 bg-muted" />
              ) : (
                <>{formattedReposPosts?.language}</>
              )}
            </li>
            <li className="flex items-center gap-2 text-muted">
              {loading ? (
                <Skeleton className="h-5 w-5 rounded-full bg-muted" />
              ) : (
                <FontAwesomeIcon className="h-4 w-4" icon={faStar} />
              )}
              {loading ? (
                <Skeleton className="h-4 w-28 bg-muted" />
              ) : (
                <>{formattedReposPosts?.stargazers_count + ' '} estrelas</>
              )}
            </li>
            <li className="flex items-center gap-2 text-muted">
              {loading ? (
                <Skeleton className="h-5 w-5 rounded-full bg-muted" />
              ) : (
                <FontAwesomeIcon
                  className="h-4 w-4 text-muted"
                  icon={faCodeFork}
                />
              )}
              {loading ? (
                <Skeleton className="h-4 w-28 bg-muted" />
              ) : (
                <>{formattedReposPosts?.forks + ' '} forks</>
              )}
            </li>
            <li className="flex items-center gap-2 text-muted">
              {loading ? (
                <Skeleton className="h-5 w-5 rounded-full bg-muted" />
              ) : (
                <FontAwesomeIcon className="h-4 w-4 text-muted" icon={faEye} />
              )}
              {loading ? (
                <Skeleton className="h-4 w-28 bg-muted" />
              ) : (
                <>{formattedReposPosts?.watchers + ' '} vistos</>
              )}
            </li>
            <li className="flex items-center gap-2">
              {loading ? (
                <Skeleton className="h-5 w-5 rounded-full bg-muted" />
              ) : (
                <FontAwesomeIcon className="h-4 w-4" icon={faCalendarDay} />
              )}
              {loading ? (
                <Skeleton className="h-4 w-28 bg-muted" />
              ) : (
                <time className="text-muted">
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
          </ul>
        </div>
      </header>
    </>
  )
}
