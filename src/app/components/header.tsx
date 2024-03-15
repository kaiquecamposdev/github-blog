'use client'

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
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface ProfileType {
  avatar_url: string
  login: string
  name: string
  html_url: string
  bio: string
  company: string
  followers: number
}

export function Header() {
  const [profile, setProfile] = useState<ProfileType>({
    avatar_url: '',
    login: '',
    name: '',
    html_url: '',
    bio: '',
    company: '',
    followers: 0,
  })
  const [loading, setLoading] = useState<boolean>(true)

  async function fetchUserSummary() {
    const url = 'https://api.github.com/users/kaiquecamposdev'
    const response = await axios.get(url)
    const data = response.data as ProfileType

    localStorage.setItem('github-blog:profile', JSON.stringify(data))

    return data
  }

  useEffect(() => {
    fetchUserSummary()
      .then((data) => {
        setProfile(data)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <header
      key={profile.login}
      className="mt-[-87px] flex items-center gap-8 rounded-lg bg-base-profile p-10 shadow-xl"
    >
      <section className="w-full max-w-37 rounded-lg">
        {loading ? (
          <Skeleton
            borderRadius={8}
            width={148}
            height={148}
            baseColor="var(--base-text)"
            className="opacity-50"
          />
        ) : (
          <Image
            priority
            src={profile.avatar_url}
            width={148}
            height={148}
            alt=""
            className="rounded-lg"
          />
        )}
      </section>
      <section className="flex w-full flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-base-title">
            {loading ? (
              <Skeleton
                width={200}
                height={24}
                baseColor="var(--base-text)"
                className="opacity-50"
              />
            ) : (
              <>{profile.name}</>
            )}
          </h1>
          <Link
            href={profile.html_url}
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
        <div className="flex flex-col gap-6">
          <p className="leading-[160%] text-base-text">
            {loading ? (
              <Skeleton
                width={500}
                height={16}
                baseColor="var(--base-text)"
                className="opacity-50"
              />
            ) : (
              <>{profile.bio}</>
            )}
          </p>
          <nav>
            <ul className="flex gap-6 text-base-subtitle">
              <li className="flex items-center gap-2">
                <FontAwesomeIcon width={18} height={18} icon={faGithub} />
                {loading ? (
                  <Skeleton
                    width={120}
                    height={16}
                    baseColor="var(--base-text)"
                    className="opacity-50"
                  />
                ) : (
                  <>{profile.login}</>
                )}
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon width={18} height={18} icon={faBuilding} />
                {loading ? (
                  <Skeleton
                    width={120}
                    height={16}
                    baseColor="var(--base-text)"
                    className="opacity-50"
                  />
                ) : (
                  <>{profile.company}</>
                )}
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon width={18} height={18} icon={faUserGroup} />
                {loading ? (
                  <Skeleton
                    width={120}
                    baseColor="var(--base-text)"
                    className="opacity-50"
                  />
                ) : (
                  <>{profile.followers + ' '} Seguidores</>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </header>
  )
}
