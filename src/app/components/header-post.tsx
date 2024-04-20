'use client'

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
import Skeleton from 'react-loading-skeleton'
import { ReposPostsContext } from '../context/repos-posts-provider'

interface QueryParamsPropsType extends Params {
  ':id': number
}

export function Header() {
  const [loading, setLoading] = useState<boolean>(true)
  const params = useParams<QueryParamsPropsType>()
  const { reposPosts } = useContext(ReposPostsContext)

  useEffect(() => {
    if (reposPosts) {
      setLoading(false)
    }
  }, [])

  const formattedReposPosts = reposPosts.find((item) => {
    return item.id === Number(params[':id'])
  })

  return (
    <>
      <header className="mt-[-87px] flex w-full flex-col items-center rounded-lg bg-base-profile p-8 shadow-xl">
        <div className="flex w-full justify-between">
          <Link href="/" className="text-xs font-bold uppercase text-base-blue">
            <FontAwesomeIcon icon={faAngleLeft} width={12} height={12} /> Voltar
          </Link>
          <Link
            href={formattedReposPosts?.html_url || '#'}
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
          {formattedReposPosts?.name}
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
                <p>{formattedReposPosts?.user.login}</p>
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
                  {formatDistance(
                    formattedReposPosts?.created_at ?? new Date(),
                    new Date(),
                    {
                      addSuffix: true,
                      locale: ptBR,
                    },
                  )}
                </time>
              )}
            </li>
            <li className="flex items-center gap-2 text-base-label">
              <FontAwesomeIcon
                width={18}
                height={18}
                className="text-base-label"
                icon={faStar}
              />
              {loading ? (
                <Skeleton
                  width={120}
                  baseColor="var(--base-text)"
                  className="opacity-50"
                />
              ) : (
                <p>{formattedReposPosts?.stargazers_count + ' '} estrelas</p>
              )}
            </li>
            <li className="flex items-center gap-2 text-base-label">
              <FontAwesomeIcon
                width={18}
                height={18}
                className="text-base-label"
                icon={faCodeFork}
              />
              {loading ? (
                <Skeleton
                  width={120}
                  baseColor="var(--base-text)"
                  className="opacity-50"
                />
              ) : (
                <p>{formattedReposPosts?.forks + ' '} forks</p>
              )}
            </li>
            <li className="flex items-center gap-2 text-base-label">
              <FontAwesomeIcon
                width={18}
                height={18}
                className="text-base-label"
                icon={faEye}
              />
              {loading ? (
                <Skeleton
                  width={120}
                  baseColor="var(--base-text)"
                  className="opacity-50"
                />
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
