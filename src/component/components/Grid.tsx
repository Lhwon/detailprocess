import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

interface GridProps {
  headers: string[]
  headersMapping: { [key: string]: string }
  headerVisible?: string[]
  rows: Array<{ [key: string]: any }>
  clickableColumns?: string[]
  onCellClick?: (header: string, rowIndex: number, cellData: any) => void
  rowColor?: (row: any) => string // 동적 색상 지원
}

const Grid: React.FC<GridProps> = ({ 
  headers, 
  headersMapping, 
  headerVisible = [], 
  rows, 
  clickableColumns = [], 
  onCellClick, 
  rowColor 
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="translated table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              !headerVisible.includes(header) && (
                <TableCell key={header}>
                  {headersMapping[header]} 
                </TableCell>
              )
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              style={{ backgroundColor: rowColor ? rowColor(row) : 'transparent' }} // 동적 색상 적용
            >
              {headers.map((header) => {
                const isClickable = clickableColumns.includes(header)
                return (
                  !headerVisible.includes(header) && (
                    <TableCell
                      key={header}
                      onClick={isClickable && onCellClick ? () => onCellClick(header, rowIndex, row[header]) : undefined}
                      style={isClickable ? { cursor: 'pointer' } : undefined}
                    >
                      {row[header]} 
                    </TableCell>
                  )
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Grid
