interface FilterOptions {
  startDate?: Date
  endDate?: Date
  minValue?: number
  maxValue?: number
  categories?: string[]
  searchTerm?: string
}

export const filterChartData = (data: any[], options: FilterOptions, dateKey: string, valueKey: string) => {
  return data.filter(item => {
    const itemDate = new Date(item[dateKey])
    const itemValue = item[valueKey]

    // Date range filter
    if (options.startDate && itemDate < options.startDate) return false
    if (options.endDate && itemDate > options.endDate) return false

    // Value range filter
    if (options.minValue !== undefined && itemValue < options.minValue) return false
    if (options.maxValue !== undefined && itemValue > options.maxValue) return false

    // Category filter
    if (options.categories?.length && !options.categories.includes(item.category)) return false

    // Search term filter
    if (options.searchTerm) {
      const searchRegex = new RegExp(options.searchTerm, 'i')
      return Object.values(item).some(value => 
        typeof value === 'string' && searchRegex.test(value)
      )
    }

    return true
  })
}

export const calculatePeriodMetrics = (data: any[], valueKey: string) => {
  return {
    total: data.reduce((sum, item) => sum + item[valueKey], 0),
    average: data.reduce((sum, item) => sum + item[valueKey], 0) / data.length,
    max: Math.max(...data.map(item => item[valueKey])),
    min: Math.min(...data.map(item => item[valueKey])),
    count: data.length,
  }
} 