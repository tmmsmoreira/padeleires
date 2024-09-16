// Import the 'Input' type from '@nordhealth/components' package.
import type { Input } from "@nordhealth/components"

// Define and export a default function 'useField' which accepts an optional parameter 'initialValue' with a default value of an empty string.
export default function useField(initialValue: any = '') {
  // Create a reference to hold an 'Input' element. Initially, it's undefined.
  const inputRef = ref<Input>()
  
  // Create a reactive reference to hold the field's value, initialized with 'initialValue'.
  const value = ref(initialValue)

  // Return a reactive object with the following properties and methods:
  return reactive({
    // Expose the current value of the field.
    value,
    
    // Method to focus on the 'Input' element referenced by 'inputRef'.
    focus: () => inputRef.value?.focus(),
    
    // Method to set the 'Input' reference when an element is assigned.
    setRef: (el: Input) => {
      inputRef.value = el
    },
  })
}
