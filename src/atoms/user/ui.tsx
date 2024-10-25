'use client'

import { useActionState, useState } from 'react'
import { mergeForm, useForm, useTransform } from '@tanstack/react-form'
import { initialFormState } from '@tanstack/react-form/nextjs'
import updateUser from './action'
import Form from 'next/form'
import { formOpts } from './shared'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ImageUploader from '@/components/image-uploader/image-uploader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export const UserForm = ({ name, picture }: { name: string; picture: string | null | undefined }) => {
  const [state, action] = useActionState(updateUser, initialFormState)
  const [open, setOpen] = useState(false);

  const form = useForm({
    ...formOpts,
    defaultValues: {
      fullname: name,
      imageURL: picture || '',
    },
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state ?? {}),
      [state]
    )
  })

  const formErrors = form.useStore(formState => formState.errors)

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost"> <Pencil /> Edit </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <Form action={action as never} onSubmit={async () => {
          await form.handleSubmit();
          setOpen(false);
        }}
        >
          {formErrors.map((error) => (
            <p key={error as string}>{error}</p>
          ))}
          <form.Field name="imageURL">
            {(field) => {
              return (
                <div className="flex items-center gap-x-8">
                  <Avatar className='size-24'>
                    <AvatarFallback>CN</AvatarFallback>
                    <AvatarImage src={field.state.value} alt="profile picture" />
                  </Avatar>
                  <div>
                    <VisuallyHidden>
                      <input readOnly type="text" id="imageURL" name="imageURL" value={field.state.value} />
                    </VisuallyHidden>
                    <ImageUploader imageSrc={field.state.value} id="imageURL" buttonMsg="Upload Image" handleAvatarChange={
                      function (imageSrc) {
                        field.handleChange(imageSrc);
                      }}
                    />
                    <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>
              )
            }}
          </form.Field>
          <form.Field name="fullname">
            {(field) => {
              return (
                <div className='mt-4'>
                  <Label htmlFor='fullname' > Full Name</Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                  />
                  {field.state.meta.errors.map((error) => (
                    <p key={error as string}>{error}</p>
                  ))}
                </div>
              )
            }}
          </form.Field>
          <form.Subscribe
            selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" variant="default" className='mt-8' disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Save'}
              </Button>
            )}
          </form.Subscribe>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
