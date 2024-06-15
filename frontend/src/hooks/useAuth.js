import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"
import { toast } from "react-toastify"
import { create } from "zustand"
import { authApi } from "../apis"
import { queryKeys } from "../config"
import { jwtDecode } from "jwt-decode"
import { httpClient } from "../services"

export const useAuthStore = create((set) => ({
  accessToken: null,
  userId: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  setUserId: (userId) => set({ userId }),
}))

export function useAuth() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const userId = useAuthStore((state) => state.userId)
  const setUserId = useAuthStore((state) => state.setUserId)

  const queryClient = useQueryClient()

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken") ?? "")
    setUserId(localStorage.getItem("userId") ?? "")
  }, [setAccessToken, setUserId])
  /* eslint-disable no-extra-boolean-cast */
  useEffect(() => {
    console.log("CHAYVAOUSEFFECTSTORAG")
    if (!!accessToken) {
      console.log("CHAYVAOACCESSTOKEN")
      httpClient.setAuthHeader(accessToken)
      localStorage.setItem("accessToken", accessToken)
    }
  }, [accessToken])

  const logIn = async ({ username, password }) => {
    try {
      const { accessToken, userId, role, payload } = await authApi.signIn(username, password)
      let decodeToken = jwtDecode(accessToken)
      httpClient.setAuthHeader(accessToken)
      console.log("TokenSTORAGE", accessToken)
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("userId", userId)
      console.log("DECODE", decodeToken)
      localStorage.setItem("role", role)
      if (payload.studentId != null) {
        localStorage.setItem("studentId", payload.studentId)
      }
      if (payload.teacherId != null) {
        localStorage.setItem("teacherId", payload.teacherId)
      }
      if (payload.subjectId != null) {
        localStorage.setItem("subjectId", payload.subjectId)
      }
      console.log("TYPEROLE", typeof role)
      setAccessToken(accessToken)
      setUserId(userId)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const logOut = useCallback(() => {
    console.log("VAOLOGOUT")
    try {
      authApi.signOut()
    } catch (error) {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userId")
      localStorage.removeItem("role")
      queryClient.cancelQueries({ queryKey: queryKeys.me.gen(accessToken || "") })
      httpClient.removeAuthHeader()
      setAccessToken("")
      setUserId("")
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userId")
      localStorage.removeItem("role")
      localStorage.removeItem("selectedIndex")
      localStorage.clear()
      queryClient.cancelQueries({ queryKey: queryKeys.me.gen(accessToken || "") })
      httpClient.removeAuthHeader()
      setAccessToken("")
      setUserId("")
    }
  }, [accessToken, queryClient, setAccessToken, setUserId])

  return {
    isLoggedIn: !!accessToken && !!userId,
    accessToken,
    logIn,
    logOut,
    userId,
  }
}
