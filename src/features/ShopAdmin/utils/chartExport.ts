import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx'

export const exportChartToPDF = async (
  chartRef: HTMLElement,
  title: string
): Promise<void> => {
  const canvas = await html2canvas(chartRef)
  const imgData = canvas.toDataURL('image/png')
  
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [canvas.width, canvas.height]
  })
  
  pdf.text(title, 20, 20)
  pdf.addImage(imgData, 'PNG', 0, 40, canvas.width, canvas.height)
  pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
}

export const exportChartDataToExcel = (
  data: any[],
  columns: Array<{ key: string; header: string }>,
  filename: string
): void => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map(item => 
      columns.reduce((acc, col) => ({
        ...acc,
        [col.header]: item[col.key]
      }), {})
    )
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
  XLSX.writeFile(workbook, `${filename}.xlsx`)
} 