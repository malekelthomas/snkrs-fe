export let APIDomain

switch (process.env.ENV) {
   case 'production':
      APIDomain = '/'
      break

   default:
      APIDomain = 'localhost:7000/'
      break
}

export enum HTTPMethod {
   GET = 'GET',
   POST = 'POST',
   DELETE = 'DELETE',
   PUT = 'PUT',
   PATCH = 'PATCH',
}

interface APIParameters {
   method: HTTPMethod
   body?: object
   query?: Record<string, string>
}

function encodeQueryParams(p: object): string {
   return Object.entries(p)
      .map((keyval) => keyval.map(encodeURIComponent).join('='))
      .join('&')
}

export async function apiWrapper<T>(
   path: string,
   params: APIParameters
): Promise<T> {
   let requestOptions: RequestInit = {
      method: params.method,
   }
   if (params.body) {
      try {
         requestOptions.body = JSON.stringify(params.body)
      } catch (error) {
         console.error(error, params.body)
      }
   }

   if (params.query) {
      path += '?' + encodeQueryParams(params.query)
   }

   const response = await fetch(APIDomain + path, requestOptions)
   if (response.ok) {
      return await response.json()
   }

   if (response.status === 204) {
      return {} as T
   }
   const errorRes = await response.json()

   if (errorRes) {
      if (errorRes.source && errorRes.source.message) {
         throw new Error(errorRes.source.message)
      }
      if (errorRes && errorRes.message) {
         throw new Error(errorRes.message)
      }
   }
   throw new Error(errorRes)
}
