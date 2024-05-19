import { httpClient } from "../services"

class AuthApi {
  async signIn(username, password) {
    const res = await httpClient.post("/login", {
      username,
      password,
    })
    return { accessToken: res.DT.token, userId: res.DT.payload.id, role: res.DT.payload.role, payload: res.DT.payload }
  }
  async signOut() {
    try {
      const res = await httpClient.delete("/logout")
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

const authApi = new AuthApi()

export default authApi
