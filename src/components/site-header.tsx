"use client"

import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"
import { usePathname } from "next/navigation"

function Breadcrumbs() {
  const pathname = usePathname()
  // Remove leading/trailing slashes, split, and filter out empty and "admin"
  const segments = pathname
    .replace(/^\/|\/$/g, "")
    .split("/")
    .filter((seg) => seg && seg !== "admin")

  // Build hrefs for each breadcrumb
  const hrefs = segments.map((_, idx) => {
    return (
      "/" +
      ["admin", ...segments.slice(0, idx + 1)].join("/")
    )
  })

  return (
    <nav className="flex items-center text-sm text-muted-foreground" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {segments.length === 0 ? (
          <li>
            <span className="font-medium text-foreground">Dashboard</span>
          </li>
        ) : (
          segments.map((seg, idx) => (
            <li key={seg} className="flex items-center">
              {idx > 0 && <span className="mx-1">/</span>}
              {idx < segments.length - 1 ? (
                <a
                  href={hrefs[idx]}
                  className="hover:underline font-medium text-foreground capitalize"
                >
                  {seg.replace(/-/g, " ")}
                </a>
              ) : (
                <span className="font-medium text-foreground capitalize">
                  {seg.replace(/-/g, " ")}
                </span>
              )}
            </li>
          ))
        )}
      </ol>
    </nav>
  )
}

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumbs />
        {/* <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div> */}
      </div>
    </header>
  )
}
