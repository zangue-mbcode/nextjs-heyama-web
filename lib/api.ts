import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export interface HeyamaObject {
  id: string
  title: string
  description: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export interface CreateObjectPayload {
  title: string
  description: string
  imageUrl: string
}

const apiClient = axios.create({
  baseURL: API_URL,
})

// Objects API
export const objectsApi = {
  getAll: async (): Promise<HeyamaObject[]> => {
    const response = await apiClient.get<HeyamaObject[]>("/objects")
    return response.data
  },

  getById: async (id: string): Promise<HeyamaObject> => {
    const response = await apiClient.get<HeyamaObject>(`/objects/${id}`)
    return response.data
  },

  create: async (title: string, description: string, file: File): Promise<HeyamaObject> => {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("file", file)

    const response = await apiClient.post<HeyamaObject>("/objects", formData)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/objects/${id}`)
  },
}

export default apiClient
