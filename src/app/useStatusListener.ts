import { useEffect, useRef } from "react"
import { FetchStatus } from "../features/form/redux/formSlice"

export default function useStatusListener(status: FetchStatus) {
    const isLoading = status === 'loading'
    return { isLoading }
}