    export type ActionResponse<T> =
  | {
      success: true
      payload: T
      message?: string
    }
  | {
      success: false
      message: string
      code?: string
    }
