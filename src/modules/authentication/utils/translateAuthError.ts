type BetterAuthErrorCode =
  | 'USER_NOT_FOUND'
  | 'FAILED_TO_CREATE_USER'
  | 'FAILED_TO_CREATE_SESSION'
  | 'FAILED_TO_UPDATE_USER'
  | 'FAILED_TO_GET_SESSION'
  | 'INVALID_PASSWORD'
  | 'INVALID_EMAIL'
  | 'INVALID_EMAIL_OR_PASSWORD'
  | 'SOCIAL_ACCOUNT_ALREADY_LINKED'
  | 'PROVIDER_NOT_FOUND'
  | 'INVALID_TOKEN'
  | 'ID_TOKEN_NOT_SUPPORTED'
  | 'FAILED_TO_GET_USER_INFO'
  | 'USER_EMAIL_NOT_FOUND'
  | 'EMAIL_NOT_VERIFIED'
  | 'PASSWORD_TOO_SHORT'
  | 'PASSWORD_TOO_LONG'
  | 'USER_ALREADY_EXISTS'
  | 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL'
  | 'EMAIL_CAN_NOT_BE_UPDATED'
  | 'CREDENTIAL_ACCOUNT_NOT_FOUND'
  | 'SESSION_EXPIRED'
  | 'FAILED_TO_UNLINK_LAST_ACCOUNT'
  | 'ACCOUNT_NOT_FOUND'
  | 'USER_ALREADY_HAS_PASSWORD'

const errorCatalog: Record<
  BetterAuthErrorCode,
  { english: string; portuguese: string }
> = {
  USER_NOT_FOUND: {
    english: 'User not found',
    portuguese: 'Usuário não encontrado.',
  },
  FAILED_TO_CREATE_USER: {
    english: 'Failed to create user',
    portuguese: 'Não foi possível criar o usuário.',
  },
  FAILED_TO_CREATE_SESSION: {
    english: 'Failed to create session',
    portuguese: 'Não foi possível criar a sessão.',
  },
  FAILED_TO_UPDATE_USER: {
    english: 'Failed to update user',
    portuguese: 'Não foi possível atualizar o usuário.',
  },
  FAILED_TO_GET_SESSION: {
    english: 'Failed to get session',
    portuguese: 'Não foi possível recuperar a sessão.',
  },
  INVALID_PASSWORD: {
    english: 'Invalid password',
    portuguese: 'Senha inválida.',
  },
  INVALID_EMAIL: {
    english: 'Invalid email',
    portuguese: 'Email inválido.',
  },
  INVALID_EMAIL_OR_PASSWORD: {
    english: 'Invalid email or password',
    portuguese: 'Email ou senha inválidos.',
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    english: 'Social account already linked',
    portuguese: 'Conta social já vinculada.',
  },
  PROVIDER_NOT_FOUND: {
    english: 'Provider not found',
    portuguese: 'Provedor não encontrado.',
  },
  INVALID_TOKEN: {
    english: 'Invalid token',
    portuguese: 'Token inválido.',
  },
  ID_TOKEN_NOT_SUPPORTED: {
    english: 'ID token not supported',
    portuguese: 'ID token não suportado.',
  },
  FAILED_TO_GET_USER_INFO: {
    english: 'Failed to get user info',
    portuguese: 'Não foi possível obter os dados do usuário.',
  },
  USER_EMAIL_NOT_FOUND: {
    english: 'User email not found',
    portuguese: 'Email do usuário não encontrado.',
  },
  EMAIL_NOT_VERIFIED: {
    english: 'Email not verified',
    portuguese: 'Email não verificado.',
  },
  PASSWORD_TOO_SHORT: {
    english: 'Password too short',
    portuguese: 'Senha muito curta.',
  },
  PASSWORD_TOO_LONG: {
    english: 'Password too long',
    portuguese: 'Senha muito longa.',
  },
  USER_ALREADY_EXISTS: {
    english: 'User already exists.',
    portuguese: 'Usuário já existe.',
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    english: 'User already exists. Use another email.',
    portuguese: 'Usuário já existe. Use outro email.',
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    english: 'Email can not be updated',
    portuguese: 'Email não pode ser atualizado.',
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    english: 'Credential account not found',
    portuguese: 'Credenciais não encontradas.',
  },
  SESSION_EXPIRED: {
    english: 'Session expired. Re-authenticate to perform this action.',
    portuguese: 'Sessão expirada. Faça login novamente.',
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    english: "You can't unlink your last account",
    portuguese: 'Não é possível desvincular a última conta.',
  },
  ACCOUNT_NOT_FOUND: {
    english: 'Account not found',
    portuguese: 'Conta não encontrada.',
  },
  USER_ALREADY_HAS_PASSWORD: {
    english: 'User already has a password. Provide that to delete the account.',
    portuguese: 'Usuário já possui uma senha. Informe-a para excluir a conta.',
  },
}

const errorMessagesByCode = Object.fromEntries(
  Object.entries(errorCatalog).map(([code, messages]) => [
    code,
    messages.portuguese,
  ])
) as Record<string, string>

const errorMessagesByEnglish = Object.fromEntries(
  Object.values(errorCatalog).map(({ english, portuguese }) => [
    english,
    portuguese,
  ])
)

/**
 * Traduz erros retornados pelo Better Auth para PT-BR.
 * Aceita objetos de erro do cliente, instâncias de Error ou strings.
 */
export function translateAuthError(
  error: unknown,
  fallbackMessage = 'Erro inesperado ao autenticar.'
): string {
  if (!error) return fallbackMessage

  if (typeof error === 'string') {
    return errorMessagesByEnglish[error] ?? error
  }

  if (error instanceof Error) {
    return errorMessagesByEnglish[error.message] ?? error.message
  }

  if (typeof error === 'object' && error !== null) {
    const { code, message } = error as {
      code?: unknown
      message?: unknown
    }

    const normalizedCode = typeof code === 'string' ? code : undefined
    if (normalizedCode && errorMessagesByCode[normalizedCode]) {
      return errorMessagesByCode[normalizedCode]
    }

    const normalizedMessage = typeof message === 'string' ? message : undefined
    if (normalizedMessage && errorMessagesByEnglish[normalizedMessage]) {
      return errorMessagesByEnglish[normalizedMessage]
    }

    if (normalizedMessage) {
      return normalizedMessage
    }
  }

  return fallbackMessage
}
