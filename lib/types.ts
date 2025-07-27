export interface User {
  id: string
  name: string
  phone: string
  email?: string
  userType: "vendor" | "supplier"
  businessName: string
  location: string
  category: string
  isVerified: boolean
  createdAt: Date
}

export interface Product {
  id: string
  name: string
  nameHindi: string
  supplierId: string
  supplierName: string
  price: number
  unit: string
  description?: string
  category: string
  images: string[]
  stock: number
  minOrderQuantity: number
  location: string
  rating: number
  reviewCount: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  vendorId: string
  vendorName: string
  supplierId: string
  supplierName: string
  items: OrderItem[]
  totalAmount: number
  status: "pending" | "accepted" | "rejected" | "in_transit" | "delivered" | "cancelled"
  deliveryAddress: string
  expectedDelivery?: Date
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unit: string
  pricePerUnit: number
  totalPrice: number
}

export interface Review {
  id: string
  orderId: string
  vendorId: string
  supplierId: string
  productId: string
  rating: number
  comment?: string
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "order" | "payment" | "delivery" | "system"
  isRead: boolean
  createdAt: Date
}
