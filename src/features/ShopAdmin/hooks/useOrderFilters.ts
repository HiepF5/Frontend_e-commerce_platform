import { useState } from 'react'

export const useOrderFilters = () => {
  const [filters, setFilters] = useState({
    page: 1,
    search: '',
    status: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
  })

  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: typeof filters[K]
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1, // Reset to first page when changing filters
    }))
  }

  return {
    filters,
    updateFilter,
  }
} 