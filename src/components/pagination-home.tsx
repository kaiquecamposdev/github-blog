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
import { CreatePagination } from '@/utils/create-pagination'
import { useContext } from 'react'

export function PaginationContainer() {
  const { reposPosts, setIndexThePage, indexThePage, search } =
    useContext(ReposPostsContext)

  function handleChangePage(index: number) {
    setIndexThePage(index)
  }
  function handlePreviousPage(index: number) {
    if (index > 0) {
      setIndexThePage(index - 1)
    }
  }
  function handleNextPage(index: number, length: number) {
    if (index >= 0 && index < length - 1) {
      setIndexThePage(index + 1)
    }
  }

  const formattedReposPost = reposPosts.filter((repo) => {
    if (!repo.name || !repo.description) {
      return false
    }

    return (
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase())
    )
  })

  const pagination = CreatePagination(formattedReposPost)

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="text-base-title"
            onClick={() => handlePreviousPage(indexThePage)}
          />
        </PaginationItem>
        {pagination.map((_, index) => {
          return (
            <PaginationItem key={index}>
              <PaginationLink
                className="text-base-title"
                onClick={() => handleChangePage(index)}
                isActive={index === indexThePage}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext
            className="text-base-title"
            onClick={() => handleNextPage(indexThePage, pagination.length)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
