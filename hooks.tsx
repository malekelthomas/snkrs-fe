import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from './store/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<Dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
