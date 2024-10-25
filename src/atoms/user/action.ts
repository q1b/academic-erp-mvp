'use server'

import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form/nextjs'
import { formOpts } from './shared'
import { getCurrentUser } from '@/lib/auth'
import { updateUser } from '@/database/actions/user'

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    console.log(value)
    return undefined
  },
})

export default async function updateUserAction(prev: unknown, formData: FormData) {
  try {
    await serverValidate(formData)
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }
    // Some other error occurred while validating your form
    throw e
  }
  const user = await getCurrentUser();

  if(!user) return
  
  const imageURL = formData.get('imageURL')
  const fullname = formData.get('fullname')
  
  await updateUser(user.id, { picture: imageURL?.toString(), name: fullname?.toString() })
}
