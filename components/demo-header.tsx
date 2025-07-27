"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, User, Bell } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"

interface DemoHeaderProps {
  title: string
  userType: "vendor" | "supplier"
  showBackButton?: boolean
}

export function DemoHeader({ title, userType, showBackButton = true }: DemoHeaderProps) {
  const { t, language } = useLanguage()

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {showBackButton && (
              <Link href="/">
                <Button variant="ghost" size="sm" className="mobile-button p-1">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <h1 className="text-sm sm:text-lg font-semibold truncate">{title}</h1>
          </div>
          <div className="flex items-center space-x-1">
            <LanguageToggle />
            <Button variant="ghost" size="sm" className="mobile-button p-1">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="mobile-button p-1">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="bg-blue-600 text-white py-1.5 px-3">
        <div className="flex items-center justify-between text-xs">
          <span className="truncate">
            🎯 {t("demo.mode")}: {userType === "vendor" ? t("vendor") : t("supplier")}
          </span>
          <div className="flex space-x-1 ml-2">
            <Link href="/vendor/dashboard">
              <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-5 text-xs px-2 py-0">
                {t("vendor")}
              </Button>
            </Link>
            <Link href="/supplier/dashboard">
              <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-5 text-xs px-2 py-0">
                {t("supplier")}
              </Button>
            </Link>
            <Link href="/">
              <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-5 text-xs px-1 py-0">
                <Home className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
