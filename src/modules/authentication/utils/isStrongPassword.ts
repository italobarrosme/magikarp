/**
 * Expressão regular para validar comprimento mínimo de 8 caracteres.
 */
const minLength = /.{8,}/

/**
 * Expressão regular para validar presença de letras maiúsculas.
 */
const hasUpperCase = /[A-Z]/

/**
 * Expressão regular para validar presença de letras minúsculas.
 */
const hasLowerCase = /[a-z]/

/**
 * Expressão regular para validar presença de números.
 */
const hasNumbers = /[0-9]/

/**
 * Expressão regular para validar presença de caracteres especiais.
 * Aceita: !@#$%^&*()_+-=[]{};':"\\|,./?
 */
const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.\/?]/

/**
 * Expressão regular para detectar espaços em branco na senha.
 */
const hasSpaces = /\s/

/**
 * Tipo de retorno da função `isStrongPassword`.
 *
 * @property {boolean} isTotalValid - Indica se a senha atende a todos os critérios de segurança.
 * @property {string[]} [tips] - Array opcional com dicas sobre o que está faltando na senha.
 */
export type IsStrongPasswordOutput = {
  isTotalValid: boolean
  tips?: string[]
}

/**
 * Valida se uma senha atende aos critérios de segurança estabelecidos.
 *
 * Esta função verifica se a senha possui:
 * - Pelo menos 8 caracteres
 * - Pelo menos uma letra maiúscula
 * - Pelo menos uma letra minúscula
 * - Pelo menos um número
 * - Pelo menos um caractere especial
 * - Nenhum espaço em branco
 *
 * Se a senha contiver espaços, a validação retorna imediatamente como inválida.
 *
 * @param {string} password - A senha a ser validada.
 * @returns {IsStrongPasswordOutput} Objeto contendo o resultado da validação e dicas sobre o que está faltando.
 *
 * @example
 * ```ts
 * const result = isStrongPassword("Senha123!");
 * // { isTotalValid: true, tips: [] }
 *
 * const result2 = isStrongPassword("senha");
 * // { isTotalValid: false, tips: ["A senha deve ter pelo menos 8 caracteres", ...] }
 *
 * const result3 = isStrongPassword("senha com espaços");
 * // { isTotalValid: false, tips: [...] }
 * ```
 */
export function isStrongPassword(password: string): IsStrongPasswordOutput {
  if (hasSpaces.test(password))
    return {
      isTotalValid: false,
      tips: getPasswordTips(password),
    }

  const isTotalValid =
    minLength.test(password) &&
    hasUpperCase.test(password) &&
    hasLowerCase.test(password) &&
    hasNumbers.test(password) &&
    hasSpecialChars.test(password)

  return {
    isTotalValid,
    tips: getPasswordTips(password),
  }
}

/**
 * Retorna um array com dicas sobre o que está faltando na senha para torná-la segura.
 *
 * Esta função verifica cada critério de segurança individualmente e retorna
 * mensagens em português indicando quais requisitos não foram atendidos.
 *
 * Os critérios verificados são (nesta ordem):
 * 1. Comprimento mínimo de 8 caracteres
 * 2. Presença de letra maiúscula
 * 3. Presença de letra minúscula
 * 4. Presença de número
 * 5. Presença de caractere especial
 *
 * @param {string} password - A senha a ser analisada.
 * @returns {string[]} Array com mensagens de dicas sobre o que está faltando na senha.
 *                     Retorna um array vazio se todos os critérios forem atendidos.
 *
 * @example
 * ```ts
 * const tips = getPasswordTips("senha");
 * // ["A senha deve ter pelo menos 8 caracteres", "A senha deve ter pelo menos uma letra maiúscula", ...]
 *
 * const tips2 = getPasswordTips("Senha123!");
 * // []
 * ```
 */
export function getPasswordTips(password: string): string[] {
  const tips = []

  switch (true) {
    case !minLength.test(password):
      tips.push('A senha deve ter pelo menos 8 caracteres')
      break
    case !hasUpperCase.test(password):
      tips.push('A senha deve ter pelo menos uma letra maiúscula')
      break
    case !hasLowerCase.test(password):
      tips.push('A senha deve ter pelo menos uma letra minúscula')
      break
    case !hasNumbers.test(password):
      tips.push('A senha deve ter pelo menos um número')
      break
    case !hasSpecialChars.test(password):
      tips.push('A senha deve ter pelo menos um caractere especial')
      break
  }

  return tips
}
