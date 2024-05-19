export const queryKeys = {
  auth: ["auth"],
  me: {
    gen: (accessToken) => ["me", accessToken],
  },
}
