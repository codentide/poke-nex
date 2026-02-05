import { DisplayError } from '@/types'

export const handleServiceError = (
  error: unknown,
  context: string,
  defaultMessage: string = 'Unexpected server error'
): DisplayError => {
  const displayError: DisplayError = {
    message: defaultMessage,
    code: 'UNKNOWN_ERROR',
    context,
  }

  if (error && typeof error === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawError = error as any
    const statusCode = rawError.status || rawError.statusCode || rawError.code
    if (statusCode) displayError.code = statusCode
    if (rawError.message) displayError.message = rawError.message
    if (rawError.context) displayError.context = rawError.context
    else displayError.context = context

    return displayError
  }

  if (error instanceof Error) {
    displayError.message = error.message
    displayError.context = context
    return displayError
  }

  if (typeof error === 'string') {
    displayError.message = error
    displayError.context = context
    return displayError
  }

  return displayError
}
