'use client'

import { updateInitialState } from '@/utils/update-initial-state'
import axios from 'axios'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import {
  GITHUB_USERNAME,
  ReposPostsContext,
} from '../context/repos-posts-provider'

interface ReadmeRepo {
  content: string
  encoding: string
}

export function ReposPosts() {
  const { reposPosts, search } = useContext(ReposPostsContext)
  const [reposReadme, setReposReadme] = useState<ReadmeRepo[]>(
    updateInitialState(
      [
        {
          content: '',
          encoding: '',
        },
      ],
      'github-blog:repos-readme',
    ),
  )

  const formattedReposPosts = reposPosts.filter(({ name }) => {
    return name.includes(search)
  })
  const repo_name = formattedReposPosts.map(({ name }) => name)

  async function fetchReadmeRepos(repo_name: string[]) {
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo_name}/readme`
    const response = await axios.get(url)

    const data = response.data as ReadmeRepo[]

    console.log(response)

    localStorage?.setItem('github-blog:repos-readme', JSON.stringify(data))

    return data
  }

  useEffect(() => {
    fetchReadmeRepos(repo_name).then((data) => setReposReadme(data))
  })

  return (
    <ul className="grid grid-cols-2 gap-8">
      {formattedReposPosts.map(({ id, name, created_at }) => {
        return (
          <li
            key={id}
            className="h-full max-h-[260px] w-full max-w-[416px] cursor-pointer rounded-[10px] bg-base-post p-8 transition-shadow hover:ring-2 hover:ring-slate-500"
          >
            <Link className="flex h-full flex-col gap-5" href={`post/${id}`}>
              <span className="flex gap-4">
                <h1 className="w-full text-xl font-bold text-base-title">
                  {name}
                </h1>
                <time className="text-nowrap text-sm text-base-span">
                  {formatDistance(created_at || new Date(), new Date(), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </time>
              </span>
              <Markdown className="overflow-hidden text-base-text">
                {reposReadme.map(({ content, encoding }) => {
                  const buff = Buffer.from(content, encoding)
                  const text = buff.toString('utf-8')
                })}
              </Markdown>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
