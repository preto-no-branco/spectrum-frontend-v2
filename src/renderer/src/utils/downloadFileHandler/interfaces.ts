export interface DownloadFileHandler {
  downloadFile: (params: { report: string; type: string; name?: string }) => void
}

export interface DownloadFileHandlerParams {
  report: string // binary file content
  type: string
  name?: string
}
