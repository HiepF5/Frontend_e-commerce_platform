import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material'

export type Order = 'asc' | 'desc'

export interface HeadCell {
  id: string
  label: string
  sortable?: boolean
  align?: 'left' | 'right' | 'center'
  width?: string | number
}

interface SortableTableHeadProps {
  headCells: HeadCell[]
  order: Order
  orderBy: string
  onRequestSort: (property: string) => void
}

export const SortableTableHead = ({
  headCells,
  order,
  orderBy,
  onRequestSort,
}: SortableTableHeadProps): JSX.Element => {
  const createSortHandler = (property: string) => () => {
    onRequestSort(property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            width={headCell.width}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
} 