'use client'

import { PER_PAGE, ReposPostsContext } from '@/app/context/repos-posts-provider'
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

  const countPages = reposPosts.length / PER_PAGE

  console.log(countPages)

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="text-base-title"
            onClick={() => handlePreviousPage}
          />
        </PaginationItem>
        {Array.from({ length: countPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink className="text-base-title">{i + 1}</PaginationLink>
          </PaginationItem>
        ))}
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
