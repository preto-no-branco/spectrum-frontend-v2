export const validatePassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const atLeastOneNumberAndOneLowercase = /(?=.*\d)(?=.*[a-z])/

export const atLeastOneUppercase = /(?=.*[A-Z])/

export const atLeastOneSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/

export const atLeastOneLowercase = /(?=.*[a-z])/

export const atLeastEightCharacters = /(?=.{8,})/
