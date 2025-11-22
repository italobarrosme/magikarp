export function formatCurrencyToBRL(
  value: number,
  isMoneyFormattedAsIntValue = false
): string {
  if (!value) return ''
  const adjustedValue = isMoneyFormattedAsIntValue ? value / 100 : value

  const parsedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(adjustedValue)

  return parsedValue
}
