'use client'
import * as React from 'react'
import { Lucide2TriangleAlertIcon, Lucide2XIcon } from '@customafk/lunas-ui/Icons'

import { cn } from '../cn'

import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, reference) => (
  <ToastPrimitives.Viewport
    ref={reference}
    className={cn(
      'fixed top-0 z-[9999]',
      'right-0 flex max-h-screen w-full flex-col-reverse p-4',
      'sm:!bottom-0 sm:!top-auto sm:!flex-col md:!max-w-[420px]',
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  [
    'group pointer-events-auto',
    'relative flex w-full items-center justify-between bg-ui-surface-50 transition-all',
    'space-x-4 overflow-hidden rounded-md border border-ui-border-300 p-6 pr-8',
    'shadow-ui-dialog',
    'data-[swipe=cancel]:translate-x-0',
    'data-[state=open]:animate-in',
    'data-[state=open]:ease-in-out',
    'data-[state=open]:slide-in-from-top-full',
    'data-[state=open]:sm:slide-in-from-bottom-full',
    'data-[state=open]:duration-300',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:ease-out-in',
    'data-[state=closed]:slide-out-to-right-full',
    'data-[state=closed]:duration-300',
  ],
  {
    variants: {
      variant: {
        default: 'border text-ui-text-800',
        destructive:
          'destructive group border-ui-destructive-500 bg-ui-destructive-50 text-ui-text-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, reference) => {
  return (
    <ToastPrimitives.Root
      ref={reference}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, reference) => (
  <ToastPrimitives.Action
    ref={reference}
    className={cn(
      'ring-offset-background hover:bg-secondary focus:ring-ring group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, reference) => (
  <ToastPrimitives.Close
    ref={reference}
    className={cn(
      [
        'absolute right-2 top-2 rounded-full p-1 opacity-0 outline-none outline-offset-0 transition-all duration-150',
        'focus:opacity-100 focus:outline-none',
        'active:ring-0',
        'group-hover:opacity-100',
        'group-[.destructive]:text-neutral-300',
        'group-[.destructive]:hover:text-neutral-500',
        'group-[.destructive]:hover:bg-neutral-200',
      ],
      className,
    )}
    toast-close=""
    {...props}
  >
    <Lucide2XIcon size={12} />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> & {
    status?: 'default' | 'destructive' | null
  }
>(({ status = 'default', className, children, ...props }, reference) => (
  <ToastPrimitives.Title
    ref={reference}
    className={cn('flex items-center gap-x-1 text-sm font-semibold', className)}
    {...props}
  >
    <div className="mb-1">
      {status === 'default' && null}
      {status === 'destructive' && <Lucide2TriangleAlertIcon size={16} color="#B91C1C" />}
    </div>
    {children}
  </ToastPrimitives.Title>
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, reference) => (
  <ToastPrimitives.Description
    ref={reference}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  Toast,
  ToastAction,
  type ToastActionElement,
  ToastClose,
  ToastDescription,
  type ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
}
