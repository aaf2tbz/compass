"use client"

import Link from "next/link"
import { IconChevronRight } from "@tabler/icons-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function FileBreadcrumb({ path }: { path: string[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {path.length === 0 ? (
            <BreadcrumbPage>My Files</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/dashboard/files">My Files</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {path.map((segment, i) => {
          const isLast = i === path.length - 1
          const href = `/dashboard/files/${path.slice(0, i + 1).join("/")}`
          return (
            <span key={segment} className="contents">
              <BreadcrumbSeparator>
                <IconChevronRight size={14} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{segment}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
