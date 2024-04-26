'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useContext } from 'react'

export function PaginationContainer() {
  const { handlePreviousPage, handleNextPage, reposPosts } =
    useContext(ReposPostsContext)

  const reposPaginated = new Set()

  for (let i = 0; i <= 6; i++) {
    reposPaginated.add(reposPosts.slice(i, 6))

    console.log(reposPaginated)
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="text-base-title"
            onClick={() => handlePreviousPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="text-base-title"></PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="text-base-title"
            onClick={() => handleNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
