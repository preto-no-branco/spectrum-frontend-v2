import CategoryService from '.'
import { categoryMappers } from './categoryMappers'
import { Category, CategoryAPIPut, UseCategoryService } from './interfaces'

export const useCategoryAPI = (): UseCategoryService => {
  const get = async (): Promise<Category[] | void> => {
    const categories = await CategoryService.getCategories((data) => {
      return data.map((category) => categoryMappers.mapDataGet(category))
    })

    if (!categories.success) {
      // alert(categoryMappers.translateError[categories.error])
      return
    } else {
      return categories.data
    }
  }

  const getById = async (id: string): Promise<Category | void> => {
    const response = await CategoryService.getCategory(id, (response) => {
      return categoryMappers.mapDataGet(response)
    })
    if (!response.success) {
      alert(categoryMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const post = async (category: Category): Promise<'category-created' | void> => {
    const response = await CategoryService.postCategory(categoryMappers.mapDataPost(category))
    if (!response.success) {
      alert(categoryMappers.translateError[response.error])
      return
    } else {
      return response.data
    }
  }

  const del = async (id: string): Promise<'category-deleted' | void> => {
    const response = await CategoryService.delCategory(id)
    if (!response.success) {
      alert(categoryMappers.translateError[response.error])
      return
    }
    return response.data
  }

  const put = async (id: string, category: Category): Promise<CategoryAPIPut | void> => {
    const response = await CategoryService.putCategoryStatus(
      id,
      categoryMappers.mapDataPut(category),
      (response) => {
        return categoryMappers.mapDataPut(response)
      }
    )
    if (!response.success) {
      alert(categoryMappers.translateError[response.error])
      return
    } else {
      return response.data
    }
  }

  return {
    get,
    getById,
    post,
    put,
    del
  }
}
