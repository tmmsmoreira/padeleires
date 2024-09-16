/**
 * Generates a random alphanumeric code of a specified length.
 * The code consists of uppercase letters, lowercase letters, and digits.
 * This is to simulate a server side function that will generate codes for gift cards.
 *
 * @param {number} [length=10] - The length of the alphanumeric code. Default is 10.
 * @returns {string} - A randomly generated alphanumeric code.
 */
export function generateAlphanumericCode(length = 10) {
  // String containing possible characters for the alphanumeric code
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  // Variable to store the generated code
  let result = ''

  // Get the total number of characters available
  const charactersLength = characters.length

  // Loop to generate a string with the specified length
  for (let i = 0; i < length; i++) {
    // Append a random character from the 'characters' string
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  // Return the generated alphanumeric code
  return result.toLocaleUpperCase()
}

/**
 * Creates a debounced function that delays the execution of the provided function until after 
 * a specified delay has passed since the last time the debounced function was invoked.
 * 
 * @param func - The function to debounce.
 * @param delay - The number of milliseconds to delay the function call.
 * @returns A debounced version of the provided function.
 */
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null // Ensure timeoutId is scoped persistently

  return (...args: Parameters<T>): void => {
    // Clear the previous timeout if it exists
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    // Set a new timeout to execute the function after the specified delay
    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null // Reset timeoutId after the function has been called
    }, delay)
  }
}

/**
 * Formats a date string into 'en-GB' (DD/MM/YYYY) format.
 *
 * @param dateText - A string representing a date (e.g. '2024-09-08').
 * @returns A string formatted as 'DD/MM/YYYY'.
 */
export function formatDate(dateText: string): string {
  // Create a new Date object from the input date string
  const date = new Date(dateText)

  // Format the date to 'en-GB' locale (DD/MM/YYYY) and return it
  return date.toLocaleDateString('en-GB')
}
