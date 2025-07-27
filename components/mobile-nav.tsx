"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Package, Users, BarChart3, Settings, LogOut } from "lucide-react"

interface MobileNavProps {
  userType: "vendor" | "supplier"
}

export function MobileNav({ userType }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const vendorLinks = [
    { href: "/vendor/dashboard", label: "डैशबोर्ड", icon: Home },
    { href: "/vendor/browse", label: "ब्राउज़ प्रोडक्ट्स", icon: Package },
    { href: "/vendor/orders", label: "मेरे ऑर्डर्स", icon: Users },
    { href: "/vendor/profile", label: "प्रोफाइल", icon: Settings },
  ]

  const supplierLinks = [
    { href: "/supplier/dashboard", label: "डैशबोर्ड", icon: Home },
    { href: "/supplier/products", label: "मेरे प्रोडक्ट्स", icon: Package },
    { href: "/supplier/orders", label: "ऑर्डर्स", icon: Users },
    { href: "/supplier/analytics", label: "एनालिटिक्स", icon: BarChart3 },
    { href: "/supplier/profile", label: "प्रोफाइल", icon: Settings },
  ]

  const links = userType === "vendor" ? vendorLinks : supplierLinks

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex flex-col h-full">
          <div className="py-4">
            <h2 className="text-lg font-semibold">FreshConnect</h2>
            <p className="text-sm text-gray-600">{userType === "vendor" ? "वेंडर पैनल" : "सप्लायर पैनल"}</p>
          </div>

          <nav className="flex-1 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t pt-4">
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-5 h-5 mr-3" />
              लॉगआउट
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
