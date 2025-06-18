export interface PermissionAPI {
  id: string
  action: string
  subject: string
}

export interface PermissionAPIPost extends Omit<PermissionAPI, 'id'> {}

export interface PermissionAPIPut extends Omit<PermissionAPI, 'id'> {}

export interface UsePermissionService {
  get: () => Promise<Permission[] | void>
  getById: (id: string) => Promise<Permission | void>
  post: (permission: Permission) => Promise<'permission-created' | void>
  put: (id: string, permission: Permission) => Promise<PermissionAPIPut | void>
  del: (id: string) => Promise<'permission-deleted' | void>
}

export interface Permission {
  id?: string
  action: string
  subject: string
}
