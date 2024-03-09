import Link from 'next/link'

interface PostProps {
  id: string
  title: string
  date: Date
  content: string
}

export function Post({ id, title, date, content }: PostProps) {
  return (
    <li
      key={id}
      className="h-full max-h-[260px] w-full max-w-[416px] cursor-pointer rounded-[10px] bg-base-post p-8"
    >
      <Link className="flex h-full flex-col gap-5" href={`post/${id}`}>
        <div className="flex gap-4">
          <h1 className="text-xl font-bold text-base-title">{title}</h1>
          <time className="text-sm text-base-span">{JSON.stringify(date)}</time>
        </div>
        <p className="overflow-hidden text-base-text">{content}</p>
      </Link>
    </li>
  )
}
