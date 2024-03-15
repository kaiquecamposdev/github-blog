import Link from 'next/link'
import { useContext } from 'react'
import { IssuesPostsContext } from '../context/issues-posts-provider'

export function IssuesPosts() {
  const { issuesPosts } = useContext(IssuesPostsContext)

  return (
    <nav>
      <ul className="grid grid-cols-2 gap-8">
        {issuesPosts.map(({ id, title, body, created_at }) => {
          return (
            <li
              key={id}
              className="h-full max-h-[260px] w-full max-w-[416px] cursor-pointer rounded-[10px] bg-base-post p-8"
            >
              <Link className="flex h-full flex-col gap-5" href={`post/${id}`}>
                <div className="flex gap-4">
                  <h1 className="text-xl font-bold text-base-title">{title}</h1>
                  <time className="text-sm text-base-span">{created_at}</time>
                </div>
                <p className="overflow-hidden text-base-text">{body}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
