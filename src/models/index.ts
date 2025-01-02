import { z } from 'zod'

export const SignInModel = z.object({
  email: z
    .string({
      required_error: 'Yêu cầu nhập e-mail',
    })
    .email({ message: 'Vui lòng nhập e-mail hợp lệ' }),
  password: z
    .string({ required_error: 'Nhập mật khẩu của bạn' })
    .min(8, {
      message: 'Mật khẩu tối thiểu 8 ký tự',
    })
    .max(50, {
      message: 'Mật khẩu không quá 50 ký tự',
    })
    .refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!-/:-@[-`{-~])\S+$/.test(value), {
      message: 'Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt',
    }),
})

export const SignUpModel = z
  .object({
    fullname: z
      .string({ required_error: 'Vui lòng nhập họ và tên' })
      .min(2, {
        message: 'Họ và tên tối thiểu 2 ký tự',
      })
      .regex(/^[a-zA-Z\s]+$/, {
        message: 'Họ và tên không chứa ký tự đặc biệt',
      }),
    email: z.string({ required_error: 'Yêu cầu nhập e-mail' }).email('Vui lòng nhập e-mail hợp lệ'),
    password: z
      .string({ required_error: 'Nhập mật khẩu của bạn' })
      .min(8, {
        message: 'Mật khẩu tối thiểu 8 ký tự',
      })
      .max(50, {
        message: 'Mật khẩu không quá 50 ký tự',
      })
      .refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!-/:-@[-`{-~])\S+$/.test(value), {
        message: 'Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu nhập lại phải trùng với mật khẩu',
    path: ['confirmPassword'],
  })
