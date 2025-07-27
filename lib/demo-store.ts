"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: number
  name: string
  nameEn: string
  supplier: string
  supplierEn: string
  supplierId: number
  price: number
  unit: string
  unitEn: string
  rating: number
  location: string
  locationEn: string
  image: string
  inStock: boolean
  stock: number
  sold: number
  description: string
  descriptionEn: string
  category: string
  categoryEn: string
  status: "active" | "out_of_stock" | "inactive"
  minOrderQuantity: number
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  vendorId: number
  vendorName: string
  vendorNameEn: string
  vendorPhone: string
  supplierId: number
  supplierName: string
  supplierNameEn: string
  items: OrderItem[]
  total: number
  status: "pending" | "accepted" | "rejected" | "in_transit" | "delivered" | "cancelled"
  date: string
  dateEn: string
  time: string
  timeEn: string
  deliveryAddress: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: number
  productName: string
  productNameEn: string
  quantity: number
  unit: string
  unitEn: string
  pricePerUnit: number
  totalPrice: number
}

export interface User {
  id: number
  name: string
  nameEn: string
  phone: string
  email?: string
  userType: "vendor" | "supplier"
  businessName: string
  businessNameEn: string
  location: string
  locationEn: string
  category: string
  categoryEn: string
  isVerified: boolean
  rating: number
  totalOrders: number
  joinedDate: Date
  avatar?: string
}

export interface Notification {
  id: string
  userId: number
  title: string
  titleEn: string
  message: string
  messageEn: string
  type: "order" | "payment" | "delivery" | "system" | "promotion"
  isRead: boolean
  createdAt: Date
  actionUrl?: string
}

interface DemoStore {
  // Current user
  currentUser: User | null
  setCurrentUser: (user: User | null) => void

  // Products
  products: Product[]
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => void
  updateProduct: (id: number, updates: Partial<Product>) => void
  deleteProduct: (id: number) => void
  updateStock: (id: number, stock: number) => void

  // Orders
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => void
  updateOrderStatus: (id: string, status: Order["status"]) => void

  // Cart
  cart: { [productId: number]: number }
  addToCart: (productId: number, quantity?: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void

  // Favorites
  favorites: number[]
  toggleFavorite: (productId: number) => void

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void

  // Search and filters
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void

  // Analytics data
  salesData: {
    daily: number[]
    monthly: number[]
    topProducts: { productId: number; sales: number }[]
    revenue: number
    totalOrders: number
    averageOrderValue: number
  }
  updateSalesData: (data: Partial<DemoStore["salesData"]>) => void
}

// Initial data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "प्याज",
    nameEn: "Onion",
    supplier: "राम सप्लायर्स",
    supplierEn: "Ram Suppliers",
    supplierId: 1,
    price: 25,
    unit: "किलो",
    unitEn: "kg",
    rating: 4.5,
    location: "2 किमी दूर",
    locationEn: "2 km away",
    image: "/placeholder.svg?height=80&width=80&text=प्याज",
    inStock: true,
    stock: 500,
    sold: 120,
    description: "ताजा लाल प्याज, A ग्रेड क्वालिटी",
    descriptionEn: "Fresh red onions, A grade quality",
    category: "vegetables",
    categoryEn: "Vegetables",
    status: "active",
    minOrderQuantity: 5,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: 2,
    name: "आलू",
    nameEn: "Potato",
    supplier: "श्याम वेजिटेबल्स",
    supplierEn: "Shyam Vegetables",
    supplierId: 2,
    price: 20,
    unit: "किलो",
    unitEn: "kg",
    rating: 4.2,
    location: "1.5 किमी दूर",
    locationEn: "1.5 km away",
    image: "/placeholder.svg?height=80&width=80&text=आलू",
    inStock: true,
    stock: 300,
    sold: 85,
    description: "देसी आलू, चाट के लिए परफेक्ट",
    descriptionEn: "Local potatoes, perfect for chaat",
    category: "vegetables",
    categoryEn: "Vegetables",
    status: "active",
    minOrderQuantity: 10,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-03-14"),
  },
  {
    id: 3,
    name: "टमाटर",
    nameEn: "Tomato",
    supplier: "गीता फार्म",
    supplierEn: "Geeta Farm",
    supplierId: 3,
    price: 30,
    unit: "किलो",
    unitEn: "kg",
    rating: 4.7,
    location: "3 किमी दूर",
    locationEn: "3 km away",
    image: "/placeholder.svg?height=80&width=80&text=टमाटर",
    inStock: false,
    stock: 0,
    sold: 200,
    description: "लाल पके हुए टमाटर",
    descriptionEn: "Red ripe tomatoes",
    category: "vegetables",
    categoryEn: "Vegetables",
    status: "out_of_stock",
    minOrderQuantity: 5,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-13"),
  },
  {
    id: 4,
    name: "हल्दी पाउडर",
    nameEn: "Turmeric Powder",
    supplier: "मसाला किंग",
    supplierEn: "Masala King",
    supplierId: 4,
    price: 180,
    unit: "किलो",
    unitEn: "kg",
    rating: 4.8,
    location: "1 किमी दूर",
    locationEn: "1 km away",
    image: "/placeholder.svg?height=80&width=80&text=हल्दी",
    inStock: true,
    stock: 50,
    sold: 30,
    description: "शुद्ध हल्दी पाउडर, 100% नेचुरल",
    descriptionEn: "Pure turmeric powder, 100% natural",
    category: "spices",
    categoryEn: "Spices",
    status: "active",
    minOrderQuantity: 1,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-03-12"),
  },
  {
    id: 5,
    name: "धनिया पाउडर",
    nameEn: "Coriander Powder",
    supplier: "मसाला किंग",
    supplierEn: "Masala King",
    supplierId: 4,
    price: 120,
    unit: "किलो",
    unitEn: "kg",
    rating: 4.6,
    location: "1 किमी दूर",
    locationEn: "1 km away",
    image: "/placeholder.svg?height=80&width=80&text=धनिया",
    inStock: true,
    stock: 75,
    sold: 45,
    description: "ताजा धनिया से बना पाउडर",
    descriptionEn: "Fresh coriander powder",
    category: "spices",
    categoryEn: "Spices",
    status: "active",
    minOrderQuantity: 1,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-03-11"),
  },
  {
    id: 6,
    name: "चावल",
    nameEn: "Rice",
    supplier: "अनाज भंडार",
    supplierEn: "Grain Store",
    supplierId: 5,
    price: 45,
    unit: "किलो",
    unitEn: "kg",
    rating: 4.3,
    location: "2.5 किमी दूर",
    locationEn: "2.5 km away",
    image: "/placeholder.svg?height=80&width=80&text=चावल",
    inStock: true,
    stock: 200,
    sold: 90,
    description: "बासमती चावल, प्रीमियम क्वालिटी",
    descriptionEn: "Basmati rice, premium quality",
    category: "grains",
    categoryEn: "Grains",
    status: "active",
    minOrderQuantity: 10,
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-03-10"),
  },
]

const initialOrders: Order[] = [
  {
    id: "ORD001",
    vendorId: 1,
    vendorName: "राहुल चाट भंडार",
    vendorNameEn: "Rahul Chaat Bhandar",
    vendorPhone: "+91 9876543210",
    supplierId: 1,
    supplierName: "राम सप्लायर्स",
    supplierNameEn: "Ram Suppliers",
    items: [
      {
        productId: 1,
        productName: "प्याज",
        productNameEn: "Onion",
        quantity: 10,
        unit: "किलो",
        unitEn: "kg",
        pricePerUnit: 25,
        totalPrice: 250,
      },
      {
        productId: 2,
        productName: "आलू",
        productNameEn: "Potato",
        quantity: 5,
        unit: "किलो",
        unitEn: "kg",
        pricePerUnit: 20,
        totalPrice: 100,
      },
    ],
    total: 350,
    status: "pending",
    date: "आज",
    dateEn: "Today",
    time: "2 घंटे पहले",
    timeEn: "2 hours ago",
    deliveryAddress: "Shop 15, Main Market, Mumbai",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "ORD002",
    vendorId: 2,
    vendorName: "सुनील स्नैक्स",
    vendorNameEn: "Sunil Snacks",
    vendorPhone: "+91 9876543211",
    supplierId: 3,
    supplierName: "गीता फार्म",
    supplierNameEn: "Geeta Farm",
    items: [
      {
        productId: 3,
        productName: "टमाटर",
        productNameEn: "Tomato",
        quantity: 15,
        unit: "किलो",
        unitEn: "kg",
        pricePerUnit: 30,
        totalPrice: 450,
      },
    ],
    total: 450,
    status: "delivered",
    date: "कल",
    dateEn: "Yesterday",
    time: "1 दिन पहले",
    timeEn: "1 day ago",
    deliveryAddress: "Shop 8, Food Court, Mumbai",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "ORD003",
    vendorId: 3,
    vendorName: "गीता दोसा सेंटर",
    vendorNameEn: "Geeta Dosa Center",
    vendorPhone: "+91 9876543212",
    supplierId: 4,
    supplierName: "मसाला किंग",
    supplierNameEn: "Masala King",
    items: [
      {
        productId: 4,
        productName: "हल्दी पाउडर",
        productNameEn: "Turmeric Powder",
        quantity: 2,
        unit: "किलो",
        unitEn: "kg",
        pricePerUnit: 180,
        totalPrice: 360,
      },
    ],
    total: 360,
    status: "in_transit",
    date: "आज",
    dateEn: "Today",
    time: "4 घंटे पहले",
    timeEn: "4 hours ago",
    deliveryAddress: "Shop 22, South Mumbai",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
]

export const useDemoStore = create<DemoStore>()(
  persist(
    (set, get) => ({
      // Current user
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),

      // Products
      products: initialProducts,
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              ...product,
              id: Math.max(...state.products.map((p) => p.id)) + 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      updateStock: (id, stock) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id
              ? {
                  ...p,
                  stock,
                  inStock: stock > 0,
                  status: stock > 0 ? "active" : "out_of_stock",
                  updatedAt: new Date(),
                }
              : p,
          ),
        })),

      // Orders
      orders: initialOrders,
      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id: `ORD${String(state.orders.length + 1).padStart(3, "0")}`,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status, updatedAt: new Date() } : o)),
        })),

      // Cart
      cart: {},
      addToCart: (productId, quantity = 1) =>
        set((state) => ({
          cart: {
            ...state.cart,
            [productId]: (state.cart[productId] || 0) + quantity,
          },
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: {
            ...state.cart,
            [productId]: Math.max((state.cart[productId] || 0) - 1, 0),
          },
        })),
      clearCart: () => set({ cart: {} }),

      // Favorites
      favorites: [1, 4],
      toggleFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        })),

      // Notifications
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: `NOTIF${Date.now()}`,
              createdAt: new Date(),
            },
            ...state.notifications,
          ],
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
        })),
      clearNotifications: () => set({ notifications: [] }),

      // Search and filters
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: "",
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      priceRange: [0, 1000],
      setPriceRange: (range) => set({ priceRange: range }),

      // Analytics data
      salesData: {
        daily: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
        monthly: [38500, 45200, 28300],
        topProducts: [
          { productId: 1, sales: 120 },
          { productId: 3, sales: 200 },
          { productId: 2, sales: 85 },
          { productId: 6, sales: 90 },
        ],
        revenue: 45200,
        totalOrders: 156,
        averageOrderValue: 290,
      },
      updateSalesData: (data) =>
        set((state) => ({
          salesData: { ...state.salesData, ...data },
        })),
    }),
    {
      name: "demo-store",
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
        currentUser: state.currentUser,
        products: state.products,
        orders: state.orders,
        notifications: state.notifications,
      }),
    },
  ),
)
