import { DownloadFileHandlerParams } from './interfaces'

export default class DownloadFileHandler {
  public static getReport = ({ report, type }: DownloadFileHandlerParams) => {
    const blob = new Blob([report], {
      type:
        type != 'xlsx'
          ? 'application/pdf'
          : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const date = new Date()
    const [day, month, year, hours, minutes] = [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
      date.getHours(),
      date.getMinutes()
    ]

    link.download = `report_${day}-${month}-${year} ${hours}-${minutes}.${type}`
    link.click()
    window.URL.revokeObjectURL(url)
    link.remove()
  }
}
