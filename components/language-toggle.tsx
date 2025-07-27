"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center space-x-1 bg-transparent">
      <Languages className="w-4 h-4" />
      <span className="text-xs font-medium">{language === "en" ? "हिं" : "EN"}</span>
    </Button>
  )
}
