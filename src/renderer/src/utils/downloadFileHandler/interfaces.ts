export interface DownloadFileHandler {
  getReport: (params: { report: string; type: string }) => void
}

export interface DownloadFileHandlerParams {
  report: string // binary file content
  type: string
}
