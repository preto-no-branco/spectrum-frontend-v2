export interface RoleAPI {
  id: string
  name: string
  permissions: string[]
}

export interface RoleAPIPost extends Omit<RoleAPI, 'id'> {}

export interface RoleAPIPut extends Omit<RoleAPI, 'id'> {}

export interface UseRoleService {
  get: () => Promise<Role[] | void>
  getById: (id: string) => Promise<Role | void>
  post: (role: Role) => Promise<'role-created' | void>
  put: (id: string, role: Role) => Promise<RoleAPIPut | void>
  del: (id: string) => Promise<'role-deleted' | void>
}

export interface Role {
  id?: string
  name: string
  permissions: string[]
}
