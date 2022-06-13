type IAjaxResponse<T> = {
  header?: HeadersInit,
  body: T,
  status?: number
}

export type DefaultResponseType <T = unknown> = {
  message: string,
  data: T
}

export type ListResponseType <T> = {
  message: string,
  list: T[],
  total: number,
};
