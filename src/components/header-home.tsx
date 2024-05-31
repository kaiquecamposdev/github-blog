'use client'

import { GITHUB_USERNAME } from '@/app/context/repos-posts-provider'
import { updateInitialState } from '@/utils/update-initial-state'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Skeleton } from './ui/skeleton'

interface IProfile {
  avatar_url: string
  login: string
  name: string
  html_url: string
  bio: string
  company: string
  followers: number
}

export function Header() {
  const [profile, setProfile] = useState<IProfile>(
    updateInitialState('github-blog:profile'),
  )
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUserSummary = useMemo(
    () => async () => {
      const url = `https://api.github.com/users/${GITHUB_USERNAME}`

      const response = await axios.get(url)
      const data = response.data as IProfile

      localStorage?.setItem('github-blog:profile', JSON.stringify(data))

      return data
    },
    [GITHUB_USERNAME],
  )

  useEffect(() => {
    if (!profile) {
      fetchUserSummary()
        .then((data) => {
          setProfile(data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(true)
          console.log(err)
        })
    }

    setLoading(false)
  }, [profile])

  return (
    <header className="mt-[-87px] flex gap-8 rounded-lg bg-profile p-8 shadow-xl">
      <section className="w-full max-w-37 rounded-lg">
        {loading ? (
          <Skeleton className="h-37 w-37 rounded-sm bg-muted" />
        ) : (
          <Image
            priority
            width={148}
            height={148}
            src={profile?.avatar_url || ''}
            className="h-37 w-37 rounded-lg"
            alt=""
          />
        )}
      </section>
      <section className="flex w-full flex-col justify-center gap-6">
        <div className="flex justify-between">
          <h1 className="text-base-title text-2xl font-bold">
            {loading ? <Skeleton className="h-4 w-48" /> : <>{profile?.name}</>}
          </h1>
          <Link
            href={profile?.html_url || '#'}
            target="_blank"
            className="flex cursor-pointer items-center gap-2 text-xs font-bold uppercase text-blue"
          >
            {loading ? (
              <Skeleton className="h-4 w-14 bg-muted" />
            ) : (
              <>
                Github
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  width={12}
                  height={12}
                />
              </>
            )}
          </Link>
        </div>
        <p className="leading-[160%] text-primary">
          {loading ? (
            <Skeleton className="h-4 w-full bg-muted" />
          ) : (
            <>{profile?.bio || 'Sem conteúdo'}</>
          )}
        </p>
        <nav className="flex flex-col">
          <ul className="flex gap-4 text-subtitle">
            <li className="flex items-center gap-2">
              <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />
              {loading ? (
                <Skeleton className="h-4 w-32 bg-muted" />
              ) : (
                <p>{profile?.login || 'Sem conteúdo'}</p>
              )}
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon className="h-4 w-4" icon={faBuilding} />
              {loading ? (
                <Skeleton className="h-4 w-32 bg-muted" />
              ) : (
                <p>{profile?.company || 'Sem conteúdo'}</p>
              )}
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon className="h-4 w-4" icon={faUserGroup} />
              {loading ? (
                <Skeleton className="h-4 w-32 bg-muted" />
              ) : (
                <p>{profile?.followers + ' ' || 0 + ' '} Seguidores</p>
              )}
            </li>
          </ul>
        </nav>
      </section>
    </header>
  )
}
