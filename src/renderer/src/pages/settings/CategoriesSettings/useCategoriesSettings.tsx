import { Category } from '@renderer/services/categoryService/interfaces'
import { useCategoryAPI } from '@renderer/services/categoryService/useCategoryAPI'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

export const useCategoriesSettings = () => {
  const { get, post, put } = useCategoryAPI()
  // const { showAlert } = useAlertDialog()
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null)
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false)

  const categoriesData = useMemo(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, categories]
  )

  const onSearchTermChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  const onCloseCreateCategoryModal = useCallback(() => {
    setIsCreateCategoryModalOpen(false)

    setTimeout(() => {
      setCategoryToEdit(null)
    }, 300)
  }, [])

  const onOpenCreateCategoryModal = useCallback(() => {
    setIsCreateCategoryModalOpen(true)
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const categories = await get()
      if (categories) setCategories(categories)
    } catch {
      console.log('error')
    }
  }, [get])

  const applyCategoryChanges = useCallback(
    ({
      data,
      isUpdate = false,
      remove = false
    }: {
      data: Category
      isUpdate?: boolean
      remove?: boolean
    }) => {
      if (isUpdate) {
        setCategories((categories) => [...categories, data])

        return
      }

      const categoryIndex = categoriesData.findIndex((category) => category.id === data.id)
      const newCategories = [...categoriesData]

      if (remove) {
        newCategories.splice(categoryIndex, 1)
        setCategories(newCategories)

        return
      }

      newCategories[categoryIndex] = data
      setCategories(newCategories)
    },
    [categoriesData]
  )

  const createCategory = useCallback(
    async (data: Category) => {
      applyCategoryChanges({ data })
      const result = await post(data)

      if (result === 'category-created') {
        onCloseCreateCategoryModal()

        fetchCategories()
        return
      }

      // TODO: implement toast
      applyCategoryChanges({ remove: true, data })
    },
    [post, onCloseCreateCategoryModal, applyCategoryChanges, fetchCategories]
  )

  const updateCategory = useCallback(
    async (id: string, data: Category) => {
      const result = await put(id, data)

      if (result) {
        applyCategoryChanges({
          data: {
            ...data,
            id
          }
        })
        onCloseCreateCategoryModal()
      }

      fetchCategories()
    },
    [put, onCloseCreateCategoryModal, applyCategoryChanges, fetchCategories]
  )

  // const deleteCategory = useCallback(
  //   async (dataToDelete: Category) => {
  //     const result = await del(dataToDelete.id || '')

  //     if (result === 'category-deleted') {
  //       applyCategoryChanges({ remove: true, data: dataToDelete })
  //     }

  //     fetchCategories()
  //   },
  //   [del, applyCategoryChanges, fetchCategories]
  // )

  const handleSubmitCategory = useCallback(
    async (data: Category, categoryId?: string) => {
      if (categoryId) {
        await updateCategory(categoryId, data)

        return
      }

      await createCategory(data)
    },
    [updateCategory, createCategory]
  )

  const handleEditCategory = useCallback(
    (data: Category) => {
      setCategoryToEdit(data)
      onOpenCreateCategoryModal()
    },
    [onOpenCreateCategoryModal]
  )

  const handleToggleActive = useCallback(
    async (catedory: Category, isActive: boolean) => {
      applyCategoryChanges({
        data: {
          ...catedory,
          active: isActive
        }
      })

      const result = await put(catedory.id || '', { ...catedory, active: isActive })

      if (!Object.keys(result || {}).length) {
        applyCategoryChanges({
          data: {
            ...catedory,
            active: !isActive
          }
        })
      }

      fetchCategories()
    },
    [put, applyCategoryChanges, fetchCategories]
  )

  // const handleDeleteCategory = useCallback(
  //   (category: Category) => {
  //     const title = 'Você deseja excluir esta categoria?'
  //     const message =
  //       'Esta categoria não poderá mais ser usada nas marcações de áreas. A exclusão é permanente e não poderá ser desfeita.'

  //     showAlert({
  //       title,
  //       message,
  //       confirmText: 'Excluir',
  //       onConfirm: () => deleteCategory(category),
  //       onConfirmProps: {
  //         className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
  //       }
  //     })
  //   },
  //   [showAlert, deleteCategory]
  // )

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    categoriesData,
    categoryToEdit,
    isCreateCategoryModalOpen,
    handleToggleActive,
    handleSubmitCategory,
    handleEditCategory,
    onSearchTermChange,
    onOpenCreateCategoryModal,
    onCloseCreateCategoryModal
  }
}
