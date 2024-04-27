import { IRepoPost } from '@/app/context/repos-posts-provider'

export function CreatePagination(objects: IRepoPost[]) {
  let currentPage = 0

  const pagesNumber = Math.ceil(objects.length / 6)
  const pagination: IRepoPost[][] = Array.from(
    { length: pagesNumber },
    () => [],
  )

  for (const object of objects) {
    if (pagination[currentPage].length === 6) {
      currentPage++
    }

    pagination[currentPage].push(object)
  }

  return pagination
}
