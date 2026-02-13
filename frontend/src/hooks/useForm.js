import { useState } from "react"

export default function useForm(initial, validateFn){

  const [values,setValues] = useState(initial)
  const [errors,setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setValues(v => ({...v,[name]:value}))
  }

  const runValidation = () => {
    const err = validateFn(values)
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
  }

  return {
    values,
    errors,
    handleChange,
    runValidation,
    reset
  }
}
