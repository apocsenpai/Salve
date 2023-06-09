function normalizeCpf(cpf: string) {
  if (!cpf) return ''

  return cpf
    .replace(/[\D]/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(.\d{3})(\d)/, '$1.$2')
    .replace(/(.\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})(\d+?)/, '$1')
}

function normalizeDate(date: string) {
  if (!date) return ''

  return date
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})(\d+?)/, '$1')
}

function normalizePhoneNumber(phoneNumber: string) {
  if (!phoneNumber) return ''

  return phoneNumber
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1')
}

export default {
  cpf: normalizeCpf,
  date: normalizeDate,
  phoneNumber: normalizePhoneNumber,
}
