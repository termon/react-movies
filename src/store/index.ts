export * from './useStateHook'
export * from './reducer'

// action function types
export type SelectAction = (id:string) => void
export type SearchAction = (query:string) => void
export type GotoPageAction = (page:number, total:number) => void
export type ResetAction = () => void

// action names
export enum Action {
  SET_MOVIES = "SET_MOVIES",
  SET_MOVIE  = "SET_MOVIE",
  QUERY = "QUERY",
  SELECT = "SELECT",
  RESET = "RESET",
  PAGE = "PAGE",
  LOADING = "LOADING",
  ERROR = "ERROR"
}

// paginator type
export interface IPaginator {
  page: number
  totalPages: number
}
