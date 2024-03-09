import Link from 'next/link'

interface PostProps {
  params: {
    ':id': string
  }
  searchParams: object
}

export default async function Post({ params }: PostProps) {
  return (
    <>
      <Link
        href="/"
        className="bg-input border-1 rounded-lg border-base-border px-4 py-3 font-bold text-white"
      >
        Voltar
      </Link>
      <h1 className="text-3xl text-white">Post</h1>
      <p className="text-white">{params[':id']}</p>
    </>
  )
}
