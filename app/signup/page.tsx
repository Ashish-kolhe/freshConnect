"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Store, Truck } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { LanguageToggle } from "@/components/language-toggle"

export default function SignupPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const userType = (searchParams.get("type") as "vendor" | "supplier") || "vendor"
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    businessName: "",
    location: "",
    category: "",
    agreeTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
            <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
              {userType === "vendor" ? (
                <Store className="w-6 h-6 text-orange-500" />
              ) : (
                <Truck className="w-6 h-6 text-green-500" />
              )}
            </div>
            <CardTitle className="text-lg">
              {userType === "vendor" ? t("vendor.signup") : t("supplier.signup")} (Demo)
            </CardTitle>
            <CardDescription className="text-xs">Fill out the form to explore the {userType} dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-xs">
                  {t("form.name")} *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={userType === "vendor" ? "राहुल शर्मा" : "राम सप्लायर"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mobile-input"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-xs">
                  {t("form.phone")} *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mobile-input"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-xs">
                  {t("form.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mobile-input"
                />
              </div>

              <div>
                <Label htmlFor="businessName" className="text-xs">
                  {userType === "vendor" ? t("form.shop.name") : t("form.business.name")} *
                </Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder={userType === "vendor" ? "राहुल चाट भंडार" : "राम वेजिटेबल्स"}
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="mobile-input"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-xs">
                  {t("form.location")} *
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                  <SelectTrigger className="mobile-input">
                    <SelectValue placeholder={t("form.select.city")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">{t("city.mumbai")}</SelectItem>
                    <SelectItem value="delhi">{t("city.delhi")}</SelectItem>
                    <SelectItem value="pune">{t("city.pune")}</SelectItem>
                    <SelectItem value="bangalore">{t("city.bangalore")}</SelectItem>
                    <SelectItem value="hyderabad">{t("city.hyderabad")}</SelectItem>
                    <SelectItem value="chennai">{t("city.chennai")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category" className="text-xs">
                  {t("form.category")} *
                </Label>
                <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="mobile-input">
                    <SelectValue placeholder={t("form.select.category")} />
                  </SelectTrigger>
                  <SelectContent>
                    {userType === "vendor" ? (
                      <>
                        <SelectItem value="chaat">{t("category.chaat")}</SelectItem>
                        <SelectItem value="dosa">{t("category.dosa")}</SelectItem>
                        <SelectItem value="vada-pav">{t("category.vada.pav")}</SelectItem>
                        <SelectItem value="biryani">{t("category.biryani")}</SelectItem>
                        <SelectItem value="juice">{t("category.juice")}</SelectItem>
                        <SelectItem value="other">{t("category.other")}</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="vegetables">{t("category.vegetables")}</SelectItem>
                        <SelectItem value="spices">{t("category.spices")}</SelectItem>
                        <SelectItem value="oil">{t("category.oil")}</SelectItem>
                        <SelectItem value="grains">{t("category.grains")}</SelectItem>
                        <SelectItem value="dairy">{t("category.dairy")}</SelectItem>
                        <SelectItem value="other">{t("category.other")}</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                />
                <Label htmlFor="terms" className="text-xs">
                  {t("form.agree.terms")}
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 mobile-button"
                disabled={!formData.agreeTerms}
              >
                🎯 Create Account & Enter Dashboard
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600">
                {t("msg.already.account")}{" "}
                <Link href="/login" className="text-orange-500 hover:underline">
                  {t("login")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
