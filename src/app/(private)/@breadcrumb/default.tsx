'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@customafk/lunas-ui/Atoms/Breadcrumb'

export default function Page() {
  const pathname = usePathname()
  return (
    <section className="container py-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/user">Thông tin tài khoản</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathname !== '/user' && <BreadcrumbSeparator />}

          {pathname === '/user/security' && (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/user/security">Thiết lập an toàn</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}

          {pathname === '/user/notification' && (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/user/notification">Thông báo</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}

          {pathname === '/user/reservation' && (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/user/reservation">Danh sách đơn hàng</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}

          {pathname === '/user/address' && (
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/user/address">Danh sách địa chỉ</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  )
}
