"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Plus, Package, TrendingUp, Users, Edit, Eye, BarChart3, Check, X, Bell, Trash2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { DemoHeader } from "@/components/demo-header"
import { useDemoStore } from "@/lib/demo-store"
import { AddProductModal } from "@/components/modals/add-product-modal"
import { EditProductModal } from "@/components/modals/edit-product-modal"

export default function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { t, language } = useLanguage()
  const {
    products,
    orders,
    notifications,
    updateOrderStatus,
    updateStock,
    deleteProduct,
    addNotification,
    markNotificationRead,
  } = useDemoStore()

  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)

  // Filter data for current supplier (demo purposes)
  const supplierProducts = products.filter((p) => p.supplierId <= 5) // Demo supplier IDs
  const supplierOrders = orders.filter((o) => o.supplierId <= 5)
  const unreadNotifications = notifications.filter((n) => !n.isRead)

  const handleOrderAction = (orderId: string, action: "accepted" | "rejected") => {
    updateOrderStatus(orderId, action)

    const order = orders.find((o) => o.id === orderId)
    if (order) {
      addNotification({
        userId: order.vendorId,
        title: action === "accepted" ? "ऑर्डर स्वीकार किया गया" : "ऑर्डर रद्द किया गया",
        titleEn: action === "accepted" ? "Order Accepted" : "Order Rejected",
        message: `आपका ऑर्डर #${orderId} ${action === "accepted" ? "स्वीकार" : "रद्द"} किया गया`,
        messageEn: `Your order #${orderId} has been ${action}`,
        type: "order",
        isRead: false,
      })
    }
  }

  const handleStockUpdate = (productId: number, newStock: number) => {
    updateStock(productId, newStock)
    setEditingProduct(null)

    addNotification({
      userId: 999,
      title: "स्टॉक अपडेट किया गया",
      titleEn: "Stock Updated",
      message: `प्रोडक्ट स्टॉक ${newStock} पर अपडेट किया गया`,
      messageEn: `Product stock updated to ${newStock}`,
      type: "system",
      isRead: false,
    })
  }

  const handleDeleteProduct = (productId: number) => {
    if (
      confirm(
        language === "hi" ? "क्या आप इस प्रोडक्ट को डिलीट करना चाहते हैं?" : "Are you sure you want to delete this product?",
      )
    ) {
      deleteProduct(productId)

      addNotification({
        userId: 999,
        title: "प्रोडक्ट डिलीट किया गया",
        titleEn: "Product Deleted",
        message: "प्रोडक्ट सफलतापूर्वक डिलीट किया गया",
        messageEn: "Product deleted successfully",
        type: "system",
        isRead: false,
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "in_transit":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      pending: language === "hi" ? "पेंडिंग" : "Pending",
      accepted: language === "hi" ? "स्वीकार किया गया" : "Accepted",
      in_transit: language === "hi" ? "रास्ते में" : "In Transit",
      delivered: language === "hi" ? "डिलीवर हो गया" : "Delivered",
      rejected: language === "hi" ? "रिजेक्ट" : "Rejected",
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  // Calculate analytics
  const totalRevenue = supplierOrders.reduce((sum, order) => sum + order.total, 0)
  const totalSales = supplierProducts.reduce((sum, product) => sum + product.sold, 0)
  const pendingOrders = supplierOrders.filter((o) => o.status === "pending").length
  const activeProducts = supplierProducts.filter((p) => p.status === "active").length

  return (
    <div className="min-h-screen bg-gray-50 mobile-container">
      <DemoHeader title={t("dashboard.supplier")} userType="supplier" />

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
            <TabsTrigger value="overview" className="text-xs py-1">
              {t("nav.overview")}
            </TabsTrigger>
            <TabsTrigger value="products" className="text-xs py-1">
              {t("nav.products")}
              <Badge variant="secondary" className="ml-1 text-xs">
                {supplierProducts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-xs py-1">
              {t("nav.orders")}
              {pendingOrders > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {pendingOrders}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs py-1">
              {t("nav.analytics")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-3">
            {/* Header with notifications */}
            <div className="flex justify-between items-center">
              <h2 className="mobile-header">{language === "hi" ? "डैशबोर्ड ओवरव्यू" : "Dashboard Overview"}</h2>
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

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="mobile-card">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">{t("stats.today.sales")}</p>
                      <p className="text-lg font-bold">₹{Math.floor(totalRevenue * 0.1)}</p>
                      <p className="text-xs text-green-600">
                        {language === "hi" ? "+12% कल से" : "+12% from yesterday"}
                      </p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="mobile-card">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">{t("stats.total.products")}</p>
                      <p className="text-lg font-bold">{supplierProducts.length}</p>
                      <p className="text-xs text-blue-600">
                        {activeProducts} {language === "hi" ? "एक्टिव" : "Active"}
                      </p>
                    </div>
                    <Package className="w-6 h-6 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Card className="mobile-card">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">{t("stats.pending.orders")}</p>
                      <p className="text-lg font-bold">{pendingOrders}</p>
                      <p className="text-xs text-orange-600">
                        {language === "hi" ? "तुरंत एक्शन चाहिए" : "Needs immediate action"}
                      </p>
                    </div>
                    <Users className="w-6 h-6 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="mobile-card">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">{t("stats.this.month")}</p>
                      <p className="text-lg font-bold">₹{totalRevenue}</p>
                      <p className="text-xs text-purple-600">
                        {supplierOrders.length} {language === "hi" ? "ऑर्डर्स" : "orders"}
                      </p>
                    </div>
                    <BarChart3 className="w-6 h-6 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="mobile-card">
              <CardHeader className="pb-2">
                <CardTitle className="mobile-header">{t("action.quick.actions")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <AddProductModal />
                <Button variant="outline" className="w-full justify-start bg-transparent mobile-button">
                  <Package className="w-4 h-4 mr-2" />
                  {t("action.update.inventory")}
                </Button>
              </CardContent>
            </Card>

            {/* Recent Orders Preview */}
            <Card className="mobile-card">
              <CardHeader className="pb-2">
                <CardTitle className="mobile-header">{t("order.recent")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {supplierOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs">#{order.id}</p>
                      <p className="text-xs text-gray-600 truncate">
                        {language === "hi" ? order.vendorName : order.vendorNameEn}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {order.items.length} {language === "hi" ? "आइटम्स" : "items"}
                      </p>
                    </div>
                    <div className="text-right ml-2">
                      <p className="font-bold text-xs">₹{order.total}</p>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>{getStatusText(order.status)}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="mobile-subheader">
                {language === "hi"
                  ? `मेरे प्रोडक्ट्स (${supplierProducts.length})`
                  : `My Products (${supplierProducts.length})`}
              </h3>
              <AddProductModal
                trigger={
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 mobile-button">
                    <Plus className="w-3 h-3 mr-1" />
                    {language === "hi" ? "जोड़ें" : "Add"}
                  </Button>
                }
              />
            </div>

            <div className="space-y-3">
              {supplierProducts.map((product) => (
                <Card key={product.id} className="mobile-card">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={language === "hi" ? product.name : product.nameEn}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {language === "hi" ? product.name : product.nameEn}
                            </h4>
                            <p className="text-xs text-gray-600">
                              ₹{product.price}/{language === "hi" ? product.unit : product.unitEn}
                            </p>
                            <p className="text-xs text-gray-500">
                              {language === "hi" ? product.category : product.categoryEn}
                            </p>
                          </div>
                          <Badge
                            variant={product.status === "active" ? "default" : "secondary"}
                            className="text-xs ml-2"
                          >
                            {product.status === "active"
                              ? language === "hi"
                                ? "एक्टिव"
                                : "Active"
                              : language === "hi"
                                ? "स्टॉक खत्म"
                                : "Out of Stock"}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <div>
                              <span className="text-xs text-gray-500">{language === "hi" ? "स्टॉक: " : "Stock: "}</span>
                              {editingProduct === product.id ? (
                                <div className="flex items-center space-x-1">
                                  <Input
                                    type="number"
                                    defaultValue={product.stock}
                                    className="w-16 h-6 text-xs p-1"
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        handleStockUpdate(
                                          product.id,
                                          Number.parseInt((e.target as HTMLInputElement).value),
                                        )
                                      }
                                    }}
                                    onBlur={(e) => {
                                      handleStockUpdate(product.id, Number.parseInt(e.target.value))
                                    }}
                                    autoFocus
                                  />
                                  <Button size="sm" onClick={() => setEditingProduct(null)} className="h-6 px-1">
                                    <Check className="w-3 h-3" />
                                  </Button>
                                </div>
                              ) : (
                                <span
                                  className="text-xs font-medium cursor-pointer hover:text-blue-600 underline"
                                  onClick={() => setEditingProduct(product.id)}
                                >
                                  {product.stock} {language === "hi" ? product.unit : product.unitEn}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-green-600">
                              {language === "hi" ? "बेचा: " : "Sold: "}
                              {product.sold} {language === "hi" ? product.unit : product.unitEn}
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <EditProductModal
                            product={product}
                            trigger={
                              <Button size="sm" variant="outline" className="mobile-button bg-transparent">
                                <Edit className="w-3 h-3 mr-1" />
                                {language === "hi" ? "एडिट" : "Edit"}
                              </Button>
                            }
                          />
                          <Button size="sm" variant="outline" className="mobile-button bg-transparent">
                            <Eye className="w-3 h-3 mr-1" />
                            {language === "hi" ? "देखें" : "View"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mobile-button bg-transparent text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="mobile-subheader">
                {language === "hi" ? `सभी ऑर्डर्स (${supplierOrders.length})` : `All Orders (${supplierOrders.length})`}
              </h3>
              <Button size="sm" variant="outline" className="mobile-button bg-transparent">
                {language === "hi" ? "फिल्टर" : "Filter"}
              </Button>
            </div>

            <div className="space-y-3">
              {supplierOrders.map((order) => (
                <Card key={order.id} className="mobile-card">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">#{order.id}</p>
                        <p className="text-xs text-gray-600 truncate">
                          {language === "hi" ? order.vendorName : order.vendorNameEn}
                        </p>
                        <p className="text-xs text-gray-500">{order.vendorPhone}</p>
                        <p className="text-xs text-gray-400">{language === "hi" ? order.time : order.timeEn}</p>
                      </div>
                      <Badge className={`${getStatusColor(order.status)} text-xs ml-2`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>

                    <div className="text-xs mb-2 bg-gray-50 p-2 rounded">
                      {order.items.map((item, index) => (
                        <div key={item.productId}>
                          {language === "hi" ? item.productName : item.productNameEn} - {item.quantity}{" "}
                          {language === "hi" ? item.unit : item.unitEn}
                          {index < order.items.length - 1 && <br />}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">₹{order.total}</span>

                      {order.status === "pending" && (
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOrderAction(order.id, "rejected")}
                            className="text-red-600 border-red-200 hover:bg-red-50 mobile-button"
                          >
                            <X className="w-3 h-3 mr-1" />
                            {t("order.reject")}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 mobile-button"
                            onClick={() => handleOrderAction(order.id, "accepted")}
                          >
                            <Check className="w-3 h-3 mr-1" />
                            {t("order.accept")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-3">
            <Card className="mobile-card">
              <CardHeader className="pb-2">
                <CardTitle className="mobile-header">{t("sales.analytics")}</CardTitle>
                <CardDescription className="text-xs">
                  {language === "hi" ? "पिछले 30 दिनों का डेटा" : "Last 30 days data"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-xs">{language === "hi" ? "कुल बिक्री" : "Total Sales"}</span>
                    <span className="font-bold text-green-600 text-sm">₹{totalRevenue}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-xs">{language === "hi" ? "कुल ऑर्डर्स" : "Total Orders"}</span>
                    <span className="font-bold text-blue-600 text-sm">{supplierOrders.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-xs">{t("average.order")}</span>
                    <span className="font-bold text-purple-600 text-sm">
                      ₹{Math.floor(totalRevenue / Math.max(supplierOrders.length, 1))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-xs">{t("top.selling")}</span>
                    <span className="font-bold text-orange-600 text-sm">
                      {supplierProducts.sort((a, b) => b.sold - a.sold)[0]
                        ? language === "hi"
                          ? supplierProducts.sort((a, b) => b.sold - a.sold)[0].name
                          : supplierProducts.sort((a, b) => b.sold - a.sold)[0].nameEn
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mobile-card">
              <CardHeader className="pb-2">
                <CardTitle className="mobile-header">{t("top.products")}</CardTitle>
                <CardDescription className="text-xs">
                  {language === "hi" ? "बिक्री के आधार पर" : "Based on sales"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {supplierProducts
                    .sort((a, b) => b.sold - a.sold)
                    .slice(0, 5)
                    .map((product, index) => (
                      <div key={product.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-gray-500 w-4">#{index + 1}</span>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={language === "hi" ? product.name : product.nameEn}
                            className="w-6 h-6 rounded object-cover"
                          />
                          <span className="text-xs font-medium truncate">
                            {language === "hi" ? product.name : product.nameEn}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-green-600">
                            {product.sold} {language === "hi" ? "बेचा" : "sold"}
                          </span>
                          <p className="text-xs text-gray-500">₹{product.price * product.sold}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mobile-card">
              <CardHeader className="pb-2">
                <CardTitle className="mobile-header">{t("monthly.trend")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>{language === "hi" ? "जनवरी" : "January"}</span>
                    <span className="font-medium">₹{Math.floor(totalRevenue * 0.85)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span>{language === "hi" ? "फरवरी" : "February"}</span>
                    <span className="font-medium">₹{totalRevenue}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span>{language === "hi" ? "मार्च (अब तक)" : "March (so far)"}</span>
                    <span className="font-medium">₹{Math.floor(totalRevenue * 0.63)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: "63%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="mobile-nav">
        <div className="grid grid-cols-4">
          <Button variant="ghost" className="mobile-nav-item" onClick={() => setActiveTab("overview")}>
            <BarChart3 className="mobile-nav-icon" />
            <span className="mobile-nav-text">{t("nav.overview")}</span>
          </Button>
          <Button variant="ghost" className="mobile-nav-item" onClick={() => setActiveTab("products")}>
            <Package className="mobile-nav-icon" />
            <span className="mobile-nav-text">{t("nav.products")}</span>
            <Badge className="absolute top-1 right-1 h-4 w-4 p-0 text-xs">{supplierProducts.length}</Badge>
          </Button>
          <Button variant="ghost" className="mobile-nav-item" onClick={() => setActiveTab("orders")}>
            <Users className="mobile-nav-icon" />
            <span className="mobile-nav-text">{t("nav.orders")}</span>
            {pendingOrders > 0 && (
              <Badge className="absolute top-1 right-1 h-4 w-4 p-0 text-xs bg-red-500">{pendingOrders}</Badge>
            )}
          </Button>
          <Button variant="ghost" className="mobile-nav-item" onClick={() => setActiveTab("analytics")}>
            <TrendingUp className="mobile-nav-icon" />
            <span className="mobile-nav-text">{t("nav.analytics")}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
