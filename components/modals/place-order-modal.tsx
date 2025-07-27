"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ShoppingCart } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useDemoStore } from "@/lib/demo-store"

export function PlaceOrderModal() {
  const { t, language } = useLanguage()
  const { cart, products, addOrder, clearCart, addNotification } = useDemoStore()
  const [open, setOpen] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState("Shop 15, Main Market, Mumbai")
  const [notes, setNotes] = useState("")

  const cartItems = Object.entries(cart)
    .filter(([_, quantity]) => quantity > 0)
    .map(([productId, quantity]) => {
      const product = products.find((p) => p.id === Number(productId))
      return product
        ? {
            product,
            quantity,
            totalPrice: product.price * quantity,
          }
        : null
    })
    .filter(Boolean)

  const totalAmount = cartItems.reduce((sum, item) => sum + (item?.totalPrice || 0), 0)

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return

    // Group items by supplier
    const ordersBySupplier: { [supplierId: number]: typeof cartItems } = {}

    cartItems.forEach((item) => {
      if (!item) return
      const supplierId = item.product.supplierId
      if (!ordersBySupplier[supplierId]) {
        ordersBySupplier[supplierId] = []
      }
      ordersBySupplier[supplierId].push(item)
    })

    // Create separate orders for each supplier
    Object.entries(ordersBySupplier).forEach(([supplierId, items]) => {
      const firstItem = items[0]
      if (!firstItem) return

      const orderItems = items.map((item) => ({
        productId: item!.product.id,
        productName: item!.product.name,
        productNameEn: item!.product.nameEn,
        quantity: item!.quantity,
        unit: item!.product.unit,
        unitEn: item!.product.unitEn,
        pricePerUnit: item!.product.price,
        totalPrice: item!.totalPrice,
      }))

      const orderTotal = items.reduce((sum, item) => sum + (item?.totalPrice || 0), 0)

      addOrder({
        vendorId: 1,
        vendorName: "राहुल चाट भंडार",
        vendorNameEn: "Rahul Chaat Bhandar",
        vendorPhone: "+91 9876543210",
        supplierId: Number(supplierId),
        supplierName: firstItem.product.supplier,
        supplierNameEn: firstItem.product.supplierEn,
        items: orderItems,
        total: orderTotal,
        status: "pending",
        date: "अभी",
        dateEn: "Now",
        time: "अभी",
        timeEn: "Now",
        deliveryAddress,
        notes,
      })

      // Add notification
      addNotification({
        userId: Number(supplierId),
        title: "नया ऑर्डर मिला",
        titleEn: "New Order Received",
        message: `राहुल चाट भंडार से ₹${orderTotal} का ऑर्डर`,
        messageEn: `Order of ₹${orderTotal} from Rahul Chaat Bhandar`,
        type: "order",
        isRead: false,
      })
    })

    clearCart()
    setOpen(false)

    // Show success notification
    addNotification({
      userId: 1,
      title: "ऑर्डर प्लेस किया गया",
      titleEn: "Order Placed",
      message: `₹${totalAmount} का ऑर्डर सफलतापूर्वक प्लेस किया गया`,
      messageEn: `Order of ₹${totalAmount} placed successfully`,
      type: "order",
      isRead: false,
    })
  }

  if (cartItems.length === 0) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-orange-500 hover:bg-orange-600 mobile-button">
          <ShoppingCart className="w-4 h-4 mr-2" />
          {language === "hi" ? "ऑर्डर करें" : "Place Order"} (₹{totalAmount})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">{language === "hi" ? "ऑर्डर कन्फर्म करें" : "Confirm Order"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Items */}
          <div>
            <Label className="text-sm font-medium">{language === "hi" ? "ऑर्डर आइटम्स" : "Order Items"}</Label>
            <div className="space-y-2 mt-2">
              {cartItems.map((item) => (
                <div key={item?.product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium">
                      {language === "hi" ? item?.product.name : item?.product.nameEn}
                    </p>
                    <p className="text-xs text-gray-600">
                      {item?.quantity} {language === "hi" ? item?.product.unit : item?.product.unitEn} × ₹
                      {item?.product.price}
                    </p>
                  </div>
                  <p className="font-bold text-sm">₹{item?.totalPrice}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <Label className="text-sm">{language === "hi" ? "डिलीवरी एड्रेस" : "Delivery Address"} *</Label>
            <Textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder={language === "hi" ? "अपना पूरा पता लिखें..." : "Enter your complete address..."}
              className="mobile-input min-h-[60px]"
              rows={3}
              required
            />
          </div>

          {/* Notes */}
          <div>
            <Label className="text-sm">{language === "hi" ? "नोट्स (वैकल्पिक)" : "Notes (Optional)"}</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={language === "hi" ? "कोई खास बात बताना चाहते हैं?" : "Any special instructions?"}
              className="mobile-input min-h-[50px]"
              rows={2}
            />
          </div>

          {/* Total */}
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{language === "hi" ? "कुल राशि:" : "Total Amount:"}</span>
              <span className="text-lg font-bold text-green-600">₹{totalAmount}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 mobile-button">
              {language === "hi" ? "रद्द करें" : "Cancel"}
            </Button>
            <Button onClick={handlePlaceOrder} className="flex-1 bg-green-500 hover:bg-green-600 mobile-button">
              {language === "hi" ? "ऑर्डर करें" : "Place Order"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
