import axios from 'axios'

const getAll = async (api: string) => {
  let loading = false
  let error = null
  const data = null

  try {
    loading = true
    const { data } = await axios.get(api)
    loading = false
    error = null
    return { data, dataLoading: loading, dataError: error }
  } catch (err: any) {
    loading = false
    if (axios.isAxiosError(error)) {
      error = err.message
      console.log('Error', err.message)
    } else {
      error = 'Unexpected error encountered'
      console.log('Error', err)
    }
    return { data, dataLoading: loading, dataError: error }
  }
}

const create = async (api: string, payload: Object) => {
  let loading = false
  let error = null
  const data = null

  try {
    loading = true
    const { data: newData } = await axios.post(api, { ...payload })
    loading = false
    error = null
    return { data: newData, dataLoading: loading, dataError: error }
  } catch (err: any) {
    loading = false
    if (axios.isAxiosError(error)) {
      error = err.message
      console.log('Error', err.message)
    } else {
      error = 'Unexpected error encountered'
      console.log('Error', err)
    }
    return { data, dataLoading: loading, dataError: error }
  }
}

const update = async (api: string, id: number, payload: Object) => {
  let loading = false
  let error = null
  const data = null

  try {
    loading = true
    const { data: updatedData } = await axios.put(`${api}/${id}`, { ...payload })
    loading = false
    error = null
    return { data: updatedData, dataLoading: loading, dataError: error }
  } catch (err: any) {
    loading = false
    if (axios.isAxiosError(error)) {
      error = err.message
      console.log('Error', err.message)
    } else {
      error = 'Unexpected error encountered'
      console.log('Error', err)
    }
  }
  return { data, dataLoading: loading, dataError: error }
}

const getOneById = async (api: string, id: number, foreign: string | null = null) => {
  let loading = false
  let error = null
  const data = null

  const fullApi = foreign ? `${api}/${foreign}/${id}` : `${api}/${id}`

  try {
    loading = true
    const { data: foundObj } = await axios.get(fullApi)
    loading = false
    error = null
    return { data: foundObj, dataLoading: loading, dataError: error }
  } catch (err: any) {
    loading = false
    if (axios.isAxiosError(error)) {
      error = err.message
      console.log('Error', err.message)
    } else {
      error = 'Unexpected error encountered'
      console.log('Error', err)
    }
  }
  return { data, dataLoading: loading, dataError: error }
}

const deleteById = async (api: string, id: number) => {
  let loading = false
  let error = null
  const data = null

  try {
    loading = true
    const { data: deletedId } = await axios.delete(`${api}/${id}`)
    loading = false
    error = null
    return { data: deletedId, dataLoading: loading, dataError: error }
  } catch (err: any) {
    loading = false
    if (axios.isAxiosError(error)) {
      error = err.message
      console.log('Error', err.message)
    } else {
      error = 'Unexpected error encountered'
      console.log('Error', err)
    }
  }
  return { data, dataLoading: loading, dataError: error }
}

export { getAll, create, update, getOneById, deleteById }
