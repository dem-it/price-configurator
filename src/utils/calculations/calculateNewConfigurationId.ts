export function calculateRandomConfigurationAnswerId(): string {
  const amountCharacters = 8

  return generateRandomId(amountCharacters)
}

export function calculateRandomConfigurationQuestionId(): string {
  const amountCharacters = 8

  return generateRandomId(amountCharacters)
}

export function calculateRandomConfigurationId(): string {
  const amountCharacters = 8

  return generateRandomId(amountCharacters)
}

function generateRandomId(amountCharacters: number): string {
  // Generate a random alphanumeric ID
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
  let randomId = ""

  for (let i = 0; i < amountCharacters; i++)
    randomId += characters.charAt(Math.floor(Math.random() * characters.length))

  return randomId
}