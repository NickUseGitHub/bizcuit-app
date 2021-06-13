import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class ApiService {
  private apis: AxiosInstance

  constructor() {
    this.apis = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    })
  }

  protected async get(url: string, config?: AxiosRequestConfig) {
    return this.apis.get(url, config)
  }
}

export default new ApiService()
