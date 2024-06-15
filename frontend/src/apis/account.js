import { httpClient } from "../services"
import { jwtDecode } from "jwt-decode"

class AccountApi {
  async getAccountById(id) {
    console.log(id)
    const res = await httpClient.get(`/account/${id}`)
    console.log(res)
    return res
  }
  async getPasswordById(id) {
    const res = await httpClient.get(`/account/${id}`)
    password = res.password
    return password
  }
  async createAccount(data) {
    const res = await httpClient.post(`/account/create-account`, data)
    return res
  }
  async changePassword(data) {
    const res = await httpClient.put(`/account/change-password`, data)
    return res
  }
}

const accountApi = new AccountApi()
export default accountApi
