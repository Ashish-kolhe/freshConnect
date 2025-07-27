"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, ShoppingCart, Heart, Package, Star, Filter, MapPin, Plus, Minus, User, Bell, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { DemoHeader } from "@/components/demo-header"
import { useDemoStore } from "@/lib/demo-store"
import { PlaceOrderModal } from "@/components/modals/place-order-modal"

export default function VendorDashboard() {
  const { t, language } = useLanguage()
  const {
    products,
    cart,
    favorites,
    orders,
    notifications,
    searchQuery,
    selectedCategory,
    priceRange,
    addToCart,
    removeFromCart,
    toggleFavorite,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    markNotificationRead,
  } = useDemoStore()

  const [activeTab, setActiveTab] = useState("browse")
  const [showFilters, setShowFilters] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Filter products based on search, category, and price
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.supplierEn.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [products, searchQuery, selectedCategory, priceRange])

  const cartTotal = Object.entries(cart).reduce((total, [productId, quantity]) => {
    const product = products.find((p) => p.id === Number.parseInt(productId))
    return total + (product ? product.price * quantity : 0)
  }, 0)

  const cartItemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0)

  const getStatusText = (status: string) => {
    const statusMap = {
      delivered: language === "hi" ? "डिलीवर हो गया" : "Delivered",
      in_transit: language === "hi" ? "रास्ते में" : "In Transit",
      pending: language === "hi" ? "पेंडिंग" : "Pending",
      accepted: language === "hi" ? "स्वीकार किया गया" : "Accepted",
      rejected: language === "hi" ? "रद्द किया गया" : "Rejected",
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  const unreadNotifications = notifications.filter((n) => !n.isRead)

  return (
    <div className="min-h-screen bg-gray-50 mobile-container">
      <DemoHeader title={t("app.name")} userType="vendor" />

      {/* Search Bar */}
      <div className="bg-white border-b p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={language === "hi" ? "खोजें प्याज, आलू, मसाले..." : "Search onion, potato, spices..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 mobile-input"
          />
          <Button
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 mobile-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-3 h-3" />
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-3">
            <div>
              <Label className="text-xs font-medium">{t("form.category")}</Label>
              <Select value={selectedCategory || "all"} onValueChange={setSelectedCategory}>
                <SelectTrigger className="mobile-input">
                  <SelectValue placeholder={language === "hi" ? "सभी कैटेगरी" : "All Categories"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === "hi" ? "सभी कैटेगरी" : "All Categories"}</SelectItem>
                  <SelectItem value="vegetables">{t("category.vegetables")}</SelectItem>
                  <SelectItem value="spices">{t("category.spices")}</SelectItem>
                  <SelectItem value="grains">{t("category.grains")}</SelectItem>
                  <SelectItem value="dairy">{t("category.dairy")}</SelectItem>
                  <SelectItem value="oil">{t("category.oil")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium">
                {language === "hi" ? "कीमत रेंज" : "Price Range"}: ₹{priceRange[0]} - ₹{priceRange[1]}
              </Label>
              <Slider value={priceRange} onValueChange={setPriceRange} max={500} min={0} step={10} className="mt-2" />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("")
                setPriceRange([0, 500])
                setSearchQuery("")
              }}
              className="w-full mobile-button bg-transparent"
            >
              {language === "hi" ? "फिल्टर क्लियर करें" : "Clear Filters"}
            </Button>
          </div>
        )}
      </div>

      {/* Cart Summary */}
      {cartItemCount > 0 && (
        <div className="bg-green-50 border-b p-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium">
              🛒 {language === "hi" ? `कार्ट में ${cartItemCount} आइटम्स` : `${cartItemCount} items in cart`}
            </span>
            <span className="font-bold text-sm">₹{cartTotal}</span>
          </div>
          <PlaceOrderModal />
        </div>
      )}

      {/* Notifications */}
      {showNotifications && (
        <div className="bg-white border-b max-h-60 overflow-y-auto">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-medium text-sm">
              {language === "hi" ? "नोटिफिकेशन" : "Notifications"} ({unreadNotifications.length})
            </h3>
            <Button size="sm" variant="ghost" onClick={() => setShowNotifications(false)} className="p-1">
              <X className="w-4 h-4" />
            </Button>
          </div>
          {notifications.length > 0 ? (
            <div className="space-y-1">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${!notification.isRead ? "bg-blue-50" : ""}`}
                  onClick={() => markNotificationRead(notification.id)}
                >
                  <p className="text-sm font-medium">{language === "hi" ? notification.title : notification.titleEn}</p>
                  <p className="text-xs text-gray-600">
                    {language === "hi" ? notification.message : notification.messageEn}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{notification.createdAt.toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm">
              {language === "hi" ? "कोई नोटिफिकेशन नहीं" : "No notifications"}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="p-3 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-3 h-8">
            <TabsTrigger value="browse" className="text-xs py-1">
              {t("nav.browse")}
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-xs py-1">
              {t("nav.orders")}{" "}
              {orders.filter((o) => o.vendorId === 1).length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {orders.filter((o) => o.vendorId === 1).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs py-1">
              {t("nav.favorites")}{" "}
              {favorites.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {favorites.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs py-1">
              {t("nav.profile")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-3">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="mobile-card">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">{t("stats.monthly.spend")}</p>
                      <p className="text-lg font-bold">₹{cartTotal + 12450}</p>
                      <p className="text-xs text-green-600">{language === "hi" ? "+8% इस महीने" : "+8% this month"}</p>
                    </div>
                    <ShoppingCart className="w-6 h-6 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="mobile-card">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">{t("stats.total.orders")}</p>
                      <p className="text-lg font-bold">{orders.filter((o) => o.vendorId === 1).length + 20}</p>
                      <p className="text-xs text-blue-600">
                        {orders.filter((o) => o.status === "pending" && o.vendorId === 1).length}{" "}
                        {language === "hi" ? "पेंडिंग" : "pending"}
                      </p>
                    </div>
                    <Package className="w-6 h-6 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="mobile-subheader mb-2">{t("form.category")}</h3>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {[
                  { key: "all", label: language === "hi" ? "सभी" : "All" },
                  { key: "vegetables", label: t("category.vegetables") },
                  { key: "spices", label: t("category.spices") },
                  { key: "grains", label: t("category.grains") },
                  { key: "dairy", label: t("category.dairy") },
                  { key: "oil", label: t("category.oil") },
                ].map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    size="sm"
                    className="whitespace-nowrap mobile-button bg-transparent"
                    onClick={() => setSelectedCategory(category.key)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="mobile-subheader">
                  {language === "hi" ? `प्रोडक्ट्स (${filteredProducts.length})` : `Products (${filteredProducts.length})`}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="mobile-button relative"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">{unreadNotifications.length}</Badge>
                  )}
                </Button>
              </div>

              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="mobile-card">
                    <CardContent className="p-3">
                      <div className="flex space-x-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={language === "hi" ? product.name : product.nameEn}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">
                                {language === "hi" ? product.name : product.nameEn}
                              </h4>
                              <p className="text-xs text-gray-600 truncate">
                                {language === "hi" ? product.supplier : product.supplierEn}
                              </p>
                              <p className="text-xs text-gray-500 line-clamp-1">
                                {language === "hi" ? product.description : product.descriptionEn}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleFavorite(product.id)}
                              className="p-1 ml-2 flex-shrink-0"
                            >
                              <Heart
                                className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                              />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm">
                              ₹{product.price}/{language === "hi" ? product.unit : product.unitEn}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{product.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="truncate">
                              {language === "hi" ? product.location : product.locationEn}
                            </span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {product.stock} {language === "hi" ? "स्टॉक में" : "in stock"}
                            </Badge>
                          </div>

                          {product.inStock ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeFromCart(product.id)}
                                  disabled={!cart[product.id]}
                                  className="mobile-button p-1 w-7 h-7"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="text-sm font-medium w-6 text-center">{cart[product.id] || 0}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addToCart(product.id)}
                                  className="mobile-button p-1 w-7 h-7"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <Button
                                size="sm"
                                className="bg-orange-500 hover:bg-orange-600 mobile-button"
                                onClick={() => addToCart(product.id)}
                              >
                                {t("add.to.cart")}
                              </Button>
                            </div>
                          ) : (
                            <Badge variant="secondary" className="w-full justify-center text-xs">
                              {t("out.of.stock")}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="mobile-subheader">{t("order.recent")}</h3>
              <Button size="sm" variant="outline" className="mobile-button bg-transparent">
                {t("action.view.all")}
              </Button>
            </div>

            {orders.filter((o) => o.vendorId === 1).length > 0 ? (
              orders
                .filter((o) => o.vendorId === 1)
                .map((order) => (
                  <Card key={order.id} className="mobile-card">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">#{order.id}</p>
                          <p className="text-xs text-gray-600 truncate">
                            {language === "hi" ? order.supplierName : order.supplierNameEn}
                          </p>
                          <div className="text-xs text-gray-500 mt-1">
                            {order.items.map((item, index) => (
                              <span key={item.productId}>
                                {language === "hi" ? item.productName : item.productNameEn} {item.quantity}
                                {language === "hi" ? item.unit : item.unitEn}
                                {index < order.items.length - 1 && ", "}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : order.status === "in_transit"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs ml-2"
                        >
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">₹{order.total}</span>
                        <span className="text-xs text-gray-500">{language === "hi" ? order.date : order.dateEn}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">{language === "hi" ? "अभी तक कोई ऑर्डर नहीं" : "No orders yet"}</p>
                <p className="text-xs text-gray-400">
                  {language === "hi" ? "प्रोडक्ट्स ब्राउज़ करें और ऑर्डर करें" : "Browse products and place orders"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-3">
            {favorites.length > 0 ? (
              <div className="space-y-3">
                <h3 className="mobile-subheader">{language === "hi" ? "पसंदीदा प्रोडक्ट्स" : "Favorite Products"}</h3>
                {favorites.map((productId) => {
                  const product = products.find((p) => p.id === productId)
                  if (!product) return null

                  return (
                    <Card key={product.id} className="mobile-card">
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={language === "hi" ? product.name : product.nameEn}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {language === "hi" ? product.name : product.nameEn}
                            </h4>
                            <p className="text-xs text-gray-600 truncate">
                              {language === "hi" ? product.supplier : product.supplierEn}
                            </p>
                            <p className="font-bold text-sm">
                              ₹{product.price}/{language === "hi" ? product.unit : product.unitEn}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              onClick={() => addToCart(product.id)}
                              className="bg-orange-500 hover:bg-orange-600 mobile-button"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              {language === "hi" ? "जोड़ें" : "Add"}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => toggleFavorite(product.id)}
                              variant="ghost"
                              className="p-1"
                            >
                              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">{t("msg.no.favorites")}</p>
                <p className="text-xs text-gray-400">{t("msg.add.favorites")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-3">
            <Card className="mobile-card">
              <CardHeader className="pb-2">
                <CardTitle className="mobile-header">{t("nav.profile")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{language === "hi" ? "राहुल शर्मा" : "Rahul Sharma"}</h3>
                    <p className="text-sm text-gray-600">{language === "hi" ? "वेरिफाइड वेंडर" : "Verified Vendor"}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-xs">4.8 (156 reviews)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium">{t("form.name")}</Label>
                  <p className="text-sm text-gray-600">{language === "hi" ? "राहुल शर्मा" : "Rahul Sharma"}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium">{t("form.shop.name")}</Label>
                  <p className="text-sm text-gray-600">{language === "hi" ? "राहुल चाट भंडार" : "Rahul Chaat Bhandar"}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium">{t("form.phone")}</Label>
                  <p className="text-sm text-gray-600">+91 9876543210</p>
                </div>
                <div>
                  <Label className="text-xs font-medium">{t("form.location")}</Label>
                  <p className="text-sm text-gray-600">{language === "hi" ? "मुंबई, महाराष्ट्र" : "Mumbai, Maharashtra"}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium">{t("form.category")}</Label>
                  <p className="text-sm text-gray-600">{t("category.chaat")}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium">{language === "hi" ? "सदस्य बने" : "Member Since"}</Label>
                  <p className="text-sm text-gray-600">{language === "hi" ? "जनवरी 2024" : "January 2024"}</p>
                </div>
                <Button className="w-full mobile-button">{t("edit.profile")}</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="mobile-nav">
        <div className="grid grid-cols-4">
          <Button variant="ghost" className="mobile-nav-item" onClick={() => setActiveTab("browse")}>
            <Search className="mobile-nav-icon" />
            <span className="mobile-nav-text">{t("nav.browse")}</span>
          </Button>
          <Button variant="ghost" className="mobile-nav-item" onClick={() => setActiveTab("orders")}>
            <Package className="mobile-nav-icon" />
            <span className="mobile-nav-text">{t("nav.orders")}</span>
            {orders.filter((o) => o.vendorId === 1 && o.status === "pending").length > 0 && (
              <Badge className="absolute top-1 right-1 h-4 w-4 p-0 text-xs">
                {orders.filter((o) => o.vendorId === 1 && o.status === "pending").length}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" className="mobile-nav-item" onClick={() => setActiveTab("favorites")}>
            <Heart className="mobile-nav-icon" />
            <span className="mobile-nav-text">{t("nav.favorites")}</span>
            {favorites.length > 0 && (
              <Badge className="absolute top-1 right-1 h-4 w-4 p-0 text-xs">{favorites.length}</Badge>
            )}
          </Button>
          <Button variant="ghost" className="mobile-nav-item" onClick={() => setActiveTab("profile")}>
            <User className="mobile-nav-icon" />
            <span className="mobile-nav-text">{t("nav.profile")}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
