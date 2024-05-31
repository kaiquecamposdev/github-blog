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
      return []
    }

    return (
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase())
    )
  })

  const pagination = CreatePagination(formattedReposPost)

  return formattedReposPost.length <= PER_PAGE ? (
    <></>
  ) : (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePreviousPage(indexThePage)}
          />
        </PaginationItem>
        {pagination.map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => handleChangePage(index)}
              isActive={index === indexThePage}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => handleNextPage(indexThePage, pagination.length)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
