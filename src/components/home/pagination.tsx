"use client"

import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
      >
        Trước
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          className={
            currentPage === page
              ? "bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500"
              : "dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
          }
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
      >
        Sau
      </Button>
    </div>
  )
}
