export interface CategoryAPI {
  id: string
  name: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface CategoryAPIPost extends Pick<CategoryAPI, 'name'> {}

export interface CategoryAPIPut extends Omit<CategoryAPI, 'id' | 'created_at' | 'updated_at'> {}

export interface CategoryAPIDelete {
  id: string
}

export interface UseCategoryService {
  get: () => Promise<Category[] | void>
  getById: (id: string) => Promise<Category | void>
  post: (category: Category) => Promise<'category-created' | void>
  put: (id: string, category: Category) => Promise<CategoryAPIPut | void>
  del: (id: string) => Promise<'category-deleted' | void>
}

export interface Category {
  id?: string
  name: string
  active: boolean
  created_at?: string
  updated_at?: string
}
