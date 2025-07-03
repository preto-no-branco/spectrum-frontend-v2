import { api } from '@renderer/utils/api'
import {
  callback,
  ErrorMessageDelete,
  ErrorMessageGet,
  ErrorMessagePatch,
  ErrorMessagePost,
  ResponseAsync
} from '../interfaces'
import { CategoryAPI, CategoryAPIPost, CategoryAPIPut } from './interfaces'

export default class CategoryService {
  static async getCategories<MappedResponse>(
    callback: callback<CategoryAPI[], MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<CategoryAPI[]>('/category')
      return {
        success: true,
        data: callback(response.data)
      }
    } catch {
      return {
        success: false,
        error: 'not_found'
      }
    }
  }

  static async getCategory<MappedResponse>(
    id: string,
    callback: callback<CategoryAPI, MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessageGet> {
    try {
      const response = await api.get<CategoryAPI>(`/category/${id}`)
      return {
        success: true,
        data: callback(response.data)
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
      return {
        success: false,
        error: 'not_found'
      }
    }
  }

  static async postCategory(
    category: CategoryAPIPost
  ): ResponseAsync<'category-created', ErrorMessagePost> {
    try {
      await api.post<{ message: string }>('/category', category)
      return {
        success: true,
        data: 'category-created'
      }
    } catch {
      return {
        success: false,
        error: 'server_error'
      }
    }
  }

  static async putCategoryStatus<MappedResponse>(
    id: string,
    data: CategoryAPIPut,
    callback: callback<CategoryAPIPut, MappedResponse>
  ): ResponseAsync<MappedResponse, ErrorMessagePatch> {
    try {
      const response = await api.put<CategoryAPIPut>(`/category/${id}`, data)
      return {
        success: true,
        data: callback(response.data)
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return {
          success: false,
          error: 'unauthorized'
        }
      } else if (error instanceof Error && error.message.includes('400')) {
        return {
          success: false,
          error: 'bad_request'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }

  static async delCategory(id: string): ResponseAsync<'category-deleted', ErrorMessageDelete> {
    try {
      await api.delete<{ message: string }>(`/category/${id}`)
      return {
        success: true,
        data: 'category-deleted'
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return {
          success: false,
          error: 'not_found'
        }
      }
      return {
        success: false,
        error: 'server_error'
      }
    }
  }
}
