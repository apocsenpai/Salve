//profile matches

export const phoneMatch = /\([1-9]{2}\) 9[1-9]\d{3}-\d{4}/
export const profileNameMatch = /^[a-záàâãéèêíïóôõöúçñ ]+$/i
export const dateMatch = /[0-3][0-9]\/[0-1][0-9]\/[1-2][9|0]\d{2}/

//user matches

export const userNameMatch = /^[a-záàâãéèêíïóôõöúçñ]+$/i
export const emailMatch = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
export const passwordMatch = /^[\w]{8,}$/i //at least 8 char

//address matches
export const cepMatch = /\d{5}-\d{3}/

//generics matches

export const alphaNumMatch = /^[\wáàâãéèêíïóôõöúçñ ]+$/i
export const numericMatch = /^[\d]+$/

//most secure password valid  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
