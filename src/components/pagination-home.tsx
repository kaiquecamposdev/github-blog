'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useContext } from 'react'

export function PaginationContainer() {
  const { handleDecrementPage, handleIncrementPage } =
    useContext(ReposPostsContext)

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="text-base-title"
            href="#"
            onClick={handleDecrementPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="text-base-title" href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis className="text-base-title" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="text-base-title"
            href="#"
            onClick={handleIncrementPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
