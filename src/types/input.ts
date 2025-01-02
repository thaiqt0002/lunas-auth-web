import { InputHTMLAttributes } from 'react'
import { Path, UseFormReturn } from 'react-hook-form'

import { AnyEntity, AnyRecord } from '@core/types/base'

import { LucideIcon } from 'lucide-react'

export type TInputType = 'text' | 'email' | 'password'

export type TForm<T extends AnyRecord> = UseFormReturn<T, AnyEntity, undefined>

export interface IInput {
  props: InputHTMLAttributes<HTMLInputElement> & { Icon?: LucideIcon }
}

export interface IOptions {
  input: Partial<IInput>
}

export interface IInputBaseProps<T extends AnyRecord> {
  name: Path<T>
  form: TForm<T>
  options?: Partial<IOptions>
}

export interface IInputTextProps<T extends AnyRecord> extends IInputBaseProps<T> {}

export type TFormItemFactoryProps<T extends AnyRecord> = IInputBaseProps<T> & {
  type: TInputType
}
