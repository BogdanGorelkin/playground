import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fakeFetchFrom } from './fakeAPI'

class ApiError extends Error {
  constructor(message: string) {
    super(message || "unknown_error")
    this.name = "ApiError"
  }
}

export type FetchStatus = "idle" | "loading" | "success" | "error"

export interface OppoFormInterface { 
  status: string
  success: number
}

export interface FormState {
  formData: OppoFormInterface|undefined
  fetchFormStatus: FetchStatus
}

export const initialState: FormState = {
  formData: undefined,
  fetchFormStatus: 'idle',
}


export const fetchForm = createAsyncThunk(
  'form/fetchCount',
  async (payload: OppoFormInterface) => {
    const response = await fakeFetchFrom(payload)
    if(!response.ok){
      throw new ApiError('unknown_error')
    }
    return response
  }
)

export const oppoFormSlice = createSlice({
  name: 'oppoForm',
  initialState,
  reducers: {
    //some other reducers
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchForm.pending, (state) => {
        state.fetchFormStatus = 'loading'
      })
      .addCase(fetchForm.fulfilled, (state, action) => {
        state.formData = action.payload.data
        state.fetchFormStatus = 'idle'
      })
      .addCase(fetchForm.rejected, (state) => {
        state.fetchFormStatus = 'error'
      })
  },
})

export default oppoFormSlice.reducer
