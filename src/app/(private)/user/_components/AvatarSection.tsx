'use client'
import Image from 'next/image'
import { ChangeEvent, FC, useState } from 'react'
import Button from '@customafk/lunas-ui/Atoms/Button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@customafk/lunas-ui/Atoms/Dialog'
import { Progress } from '@customafk/lunas-ui/Atoms/Progress'
import UserAvatar from '@customafk/lunas-ui/Atoms/UserAvatar'

import { helper } from '@core/libs'
import { useStore } from '@core/libs/zustand'

import { presignedUrl } from '@core/api/preSignedUrl'
import userService from '@core/app/_services/user'

import { useQueryClient } from '@tanstack/react-query'
import { ChevronsRightIcon, Edit2, UploadCloudIcon, UserIcon } from 'lucide-react'

const AvatarSection: FC = () => {
  const queryClient = useQueryClient()
  const user = useStore().use.user?.()
  const { refetch, data, isFetching } = userService.useUpdateAvatar()

  const [open, setOpen] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      if (!data?.preSignedUrl) {
        refetch()
      }
    }
  }

  if (!user) return null
  return (
    <div className="relative size-24">
      <div className="rounded-full bg-ui-surface-50 shadow-ui-flat">
        <UserAvatar
          size={96}
          fullname={user.fullname}
          email={user.email}
          src={user?.avatar ? helper.convertImageUrl(user.avatar) : null}
          isButton={false}
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <button className="absolute bottom-0 right-0 size-fit rounded-full bg-ui-surface-50 p-2 shadow-ui-flat">
            <Edit2 size={12} />
          </button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogTitle className="flex w-full justify-center py-3 text-ui-h3 font-semibold text-ui-text-700">
            Đổi hình đại diện
          </DialogTitle>
          <div className="flex w-full flex-col items-center gap-y-5 border-t px-6 py-4">
            <div className="flex items-center justify-center gap-x-5">
              <UserAvatar
                size={102}
                fullname={user.fullname}
                email={user.email}
                src={user.avatar ? helper.convertImageUrl(user.avatar) : null}
                isButton={true}
              />
              <ChevronsRightIcon size={36} />
              {file ? (
                <div className="flex size-[6.375rem] items-center justify-center rounded-full bg-ui-surface-100">
                  <Image
                    alt="avatar new"
                    src={URL.createObjectURL(file)}
                    width={102}
                    height={102}
                    className="size-[6.375rem] rounded-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex size-[6.375rem] items-center justify-center rounded-full bg-ui-surface-100">
                  <UserIcon size={64} color="#6B7280" />
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-y-1 rounded-xl bg-ui-surface-100 px-12 py-4">
              <Button variant="outline" className="!p-0">
                <label
                  htmlFor="avatar"
                  className="flex size-full items-center justify-center gap-x-1 px-3 py-1.5 hover:cursor-pointer"
                >
                  <UploadCloudIcon size={16} />
                  Chọn ảnh
                </label>
              </Button>
              <p className="text-ui-small-note text-ui-text-600">
                File phải thuộc định dạng .jpg/.jpeg/.png
              </p>
            </div>
            <Progress value={progress} max={100} className="w-[70%]" />

            <div className="flex gap-x-5 *:px-6 *:text-ui-note *:font-bold">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button
                type="button"
                disabled={isFetching || !file}
                onClick={() => {
                  if (data?.preSignedUrl && !!file) {
                    presignedUrl(data.preSignedUrl, file, (progress) => {
                      setProgress(progress)
                    }).finally(() => {
                      setFile(null)
                      setOpen(false)
                      setProgress(0)
                      queryClient.setQueryData(['GET_PRE_SIGNED_URL_AVATAR'], null)
                      queryClient.invalidateQueries({ queryKey: ['GET_ME'] })
                    })
                  }
                }}
              >
                Lưu
              </Button>
            </div>
          </div>
          <input
            id="avatar"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AvatarSection
