"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Store, Users, Truck, Star, MapPin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { LanguageToggle } from "@/components/language-toggle"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white mobile-container">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Store className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">{t("app.name")}</h1>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <LanguageToggle />
              <Link href="/login">
                <Button variant="outline" size="sm" className="mobile-button bg-transparent">
                  {t("login")}
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 mobile-button">
                  {t("signup")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-3 text-center">
          <p className="text-xs sm:text-sm">
            🎯 <strong>Live Demo</strong> - Try both dashboards:
            <Link href="/vendor/dashboard" className="underline mx-1 sm:mx-2 hover:text-blue-200">
              Vendor
            </Link>
            |
            <Link href="/supplier/dashboard" className="underline mx-1 sm:mx-2 hover:text-blue-200">
              Supplier
            </Link>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-6 sm:py-12 px-3">
        <div className="container mx-auto text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{t("app.tagline")}</h2>
          <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">{t("app.description")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <Card className="mobile-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-3 sm:pb-4">
                <ShoppingCart className="w-8 h-8 sm:w-12 sm:h-12 text-orange-500 mx-auto mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">{t("vendor.join")}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{t("vendor.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                  <li>• {t("feature.compare.prices")}</li>
                  <li>• {t("feature.bulk.orders")}</li>
                  <li>• {t("feature.track.delivery")}</li>
                  <li>• {t("feature.ratings.reviews")}</li>
                </ul>
                <div className="space-y-2">
                  <Link href="/vendor/dashboard">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 mobile-button">
                      🎯 Try Vendor Dashboard
                    </Button>
                  </Link>
                  <Link href="/signup?type=vendor">
                    <Button variant="outline" className="w-full bg-transparent mobile-button">
                      {t("vendor.signup")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="mobile-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-3 sm:pb-4">
                <Truck className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 mx-auto mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">{t("supplier.join")}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{t("supplier.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                  <li>• {t("feature.list.products")}</li>
                  <li>• {t("feature.manage.inventory")}</li>
                  <li>• {t("feature.track.orders")}</li>
                  <li>• {t("feature.sales.analytics")}</li>
                </ul>
                <div className="space-y-2">
                  <Link href="/supplier/dashboard">
                    <Button className="w-full bg-green-500 hover:bg-green-600 mobile-button">
                      🎯 Try Supplier Dashboard
                    </Button>
                  </Link>
                  <Link href="/signup?type=supplier">
                    <Button variant="outline" className="w-full bg-transparent mobile-button">
                      {t("supplier.signup")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-3">
          <h3 className="text-lg sm:text-2xl font-bold text-center mb-6 sm:mb-8">{t("why.choose")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <Users className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <h4 className="font-semibold mb-2 text-sm sm:text-base">{t("why.trusted.network")}</h4>
              <p className="text-xs sm:text-sm text-gray-600">{t("why.trusted.desc")}</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-3 sm:mb-4" />
              <h4 className="font-semibold mb-2 text-sm sm:text-base">{t("why.rating.system")}</h4>
              <p className="text-xs sm:text-sm text-gray-600">{t("why.rating.desc")}</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 sm:w-12 sm:h-12 text-red-500 mx-auto mb-3 sm:mb-4" />
              <h4 className="font-semibold mb-2 text-sm sm:text-base">{t("why.local.supply")}</h4>
              <p className="text-xs sm:text-sm text-gray-600">{t("why.local.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="container mx-auto px-3 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Store className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold">{t("app.name")}</h1>
          </div>
          <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm">{t("msg.digitizing.street.food")}</p>
          <div className="flex justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <Link href="/about" className="hover:text-orange-400">
              {t("nav.about")}
            </Link>
            <Link href="/about" className="hover:text-orange-400">
              {t("nav.contact")}
            </Link>
            <Link href="/about" className="hover:text-orange-400">
              {t("nav.help")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
