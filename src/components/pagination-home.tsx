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
import { useContext, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'

export function PaginationContainer() {
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    if (reposPosts) {
      setLoading(false)
    }
  }, [])

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
          {loading ? (
            <Skeleton className="h-9 w-20 bg-muted" />
          ) : (
            <PaginationPrevious
              onClick={() => handlePreviousPage(indexThePage)}
            />
          )}
        </PaginationItem>
        {loading ? (
          <div className="flex gap-1">
            <Skeleton className="h-9 w-9 bg-muted" />
            <Skeleton className="h-9 w-9 bg-muted" />
            <Skeleton className="h-9 w-9 bg-muted" />
          </div>
        ) : (
          pagination.map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handleChangePage(index)}
                isActive={index === indexThePage}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        )}
        <PaginationItem>
          {loading ? (
            <Skeleton className="h-9 w-20 bg-muted" />
          ) : (
            <PaginationNext
              onClick={() => handleNextPage(indexThePage, pagination.length)}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
