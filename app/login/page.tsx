"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Store, Truck } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { LanguageToggle } from "@/components/language-toggle"

export default function LoginPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [userType, setUserType] = useState<"vendor" | "supplier">("vendor")

  const handleDemoLogin = () => {
    const redirectPath = userType === "supplier" ? "/supplier/dashboard" : "/vendor/dashboard"
    router.push(redirectPath)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 mobile-container">
      <div className="container mx-auto max-w-md">
        <div className="mb-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm">{t("back")}</span>
          </Link>
          <LanguageToggle />
        </div>

        <Card className="mobile-card">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-lg">Demo Login</CardTitle>
            <CardDescription className="text-xs">Choose your user type and explore the dashboard!</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={userType}
              onValueChange={(value) => setUserType(value as "vendor" | "supplier")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 h-8">
                <TabsTrigger value="vendor" className="flex items-center space-x-1 text-xs py-1">
                  <Store className="w-3 h-3" />
                  <span>{t("vendor")}</span>
                </TabsTrigger>
                <TabsTrigger value="supplier" className="flex items-center space-x-1 text-xs py-1">
                  <Truck className="w-3 h-3" />
                  <span>{t("supplier")}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={userType} className="mt-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 text-sm">
                      {userType === "supplier" ? "Supplier Demo" : "Vendor Demo"}
                    </h3>
                    <p className="text-xs text-blue-700 mt-1">
                      {userType === "supplier"
                        ? "Manage products, view orders, and track sales analytics"
                        : "Browse products, place orders, and manage your business"}
                    </p>
                  </div>

                  <Button onClick={handleDemoLogin} className="w-full bg-orange-500 hover:bg-orange-600 mobile-button">
                    🎯 Enter {userType === "supplier" ? "Supplier" : "Vendor"} Dashboard
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600">
                Want to try signup?{" "}
                <Link href="/signup" className="text-orange-500 hover:underline">
                  Sign Up Demo
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
