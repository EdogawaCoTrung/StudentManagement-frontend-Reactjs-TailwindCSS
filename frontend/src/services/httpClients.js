import axios from "axios"
// import createAuthRefreshInterceptor from "axios-auth-refresh"
// import { authApi } from "../apis"
// import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh"
// import _createAuthRefreshInterceptor from "axios-auth-refresh"
class HttpClient {
  constructor() {
    this.baseUrl = "http://localhost:8081" || ""
    this.instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    })
  }

  getUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`
  }

  async get(endpoint, config) {
    const response = await this.instance.get(this.getUrl(endpoint), config)
    return response.data
  }

  async post(endpoint, data, config) {
    const response = await this.instance.post(this.getUrl(endpoint), data, config)
    return response.data
  }

  async put(endpoint, data, config) {
    const response = await this.instance.put(this.getUrl(endpoint), data, config)
    return response.data
  }

  async delete(endpoint, config) {
    const response = await this.instance.delete(this.getUrl(endpoint), config)
    return response.data
  }

  setAuthHeader(token) {
    console.log("SETAUTHHEADE", token)
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }

  removeAuthHeader() {
    delete this.instance.defaults.headers.common["Authorization"]
  }

  //   createAuthRefreshInterceptor(onSuccess, onError) {
  //     _createAuthRefreshInterceptor(
  //       this.instance,
  //       async (failedRequest) => {
  //         try {
  //           const { accessToken } = await authApi.refreshToken()
  //           failedRequest.response.config.headers["Authorization"] = "Bearer " + accessToken
  //           onSuccess && onSuccess(accessToken)
  //           return Promise.resolve()
  //         } catch (error) {
  //           onError && onError(error)
  //           return Promise.reject(error)
  //         }
  //       },
  //       {
  //         pauseInstanceWhileRefreshing: true,
  //         statusCodes: [401],
  //       },
  //     )
  //   }
}

export function handleError(error, onError) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status >= 500 && error.response.status < 600) {
        throw new Error("Đã có lỗi xãy ra. Vui lòng thử lại sau.")
      }

      onError?.(error.response)
    } else {
      throw new Error("Đã có lỗi xãy ra. Vui lòng thử lại sau.")
    }
  } else {
    throw new Error("Đã có lỗi xãy ra. Vui lòng thử lại sau.")
  }
}

const httpClient = new HttpClient()

export default httpClient
