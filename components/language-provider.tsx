"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations = {
  en: {
    // Common
    "app.name": "FreshConnect",
    "app.tagline": "Best marketplace for street food vendors",
    "app.description": "Get affordable raw materials directly from trusted local suppliers",
    login: "Login",
    signup: "Sign Up",
    back: "Back",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    filter: "Filter",
    search: "Search",
    loading: "Loading...",

    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.help": "Help",
    "nav.dashboard": "Dashboard",
    "nav.products": "Products",
    "nav.orders": "Orders",
    "nav.profile": "Profile",
    "nav.analytics": "Analytics",
    "nav.browse": "Browse",
    "nav.favorites": "Favorites",
    "nav.overview": "Overview",

    // User Types
    vendor: "Vendor",
    supplier: "Supplier",
    "vendor.join": "Join as Vendor",
    "supplier.join": "Join as Supplier",
    "vendor.signup": "Vendor Sign Up",
    "supplier.signup": "Supplier Sign Up",
    "vendor.description": "Buy raw materials at better prices",
    "supplier.description": "Sell your products and grow business",

    // Forms
    "form.name": "Full Name",
    "form.phone": "Mobile Number",
    "form.email": "Email (Optional)",
    "form.business.name": "Business Name",
    "form.shop.name": "Shop Name",
    "form.location": "Location",
    "form.category": "Category",
    "form.select.city": "Select your city",
    "form.select.category": "Select category",
    "form.agree.terms": "I agree to terms and conditions",
    "form.otp": "OTP",
    "form.otp.sent": "OTP sent to",
    "form.send.otp": "Send OTP",
    "form.change.number": "Change Number",

    // Categories
    "category.vegetables": "Vegetables",
    "category.spices": "Spices",
    "category.oil": "Oil",
    "category.grains": "Grains",
    "category.dairy": "Dairy",
    "category.chaat": "Chaat",
    "category.dosa": "Dosa",
    "category.vada.pav": "Vada Pav",
    "category.biryani": "Biryani",
    "category.juice": "Juice",
    "category.other": "Other",

    // Products
    "product.onion": "Onion",
    "product.potato": "Potato",
    "product.tomato": "Tomato",
    "product.turmeric": "Turmeric Powder",
    "unit.kg": "kg",
    "unit.liter": "liter",
    "add.to.cart": "Add to Cart",
    "out.of.stock": "Out of Stock",
    "in.stock": "In Stock",
    "price.per": "per",

    // Dashboard
    "dashboard.vendor": "Vendor Dashboard",
    "dashboard.supplier": "Supplier Dashboard",
    "dashboard.panel": "Panel",
    "stats.monthly.spend": "Monthly Spend",
    "stats.total.orders": "Total Orders",
    "stats.today.sales": "Today's Sales",
    "stats.total.products": "Total Products",
    "stats.pending.orders": "Pending Orders",
    "stats.this.month": "This Month",
    "dashboard.title": "Dashboard",
    "cart.items": "items in cart",
    "cart.total": "Total",
    "product.description": "Description",
    "stock.update": "Update Stock",
    "order.accept": "Accept",
    "order.reject": "Reject",
    "sales.analytics": "Sales Analytics",
    "monthly.trend": "Monthly Trend",
    "top.products": "Top Products",
    sold: "sold",
    revenue: "Revenue",
    "average.order": "Average Order Value",
    "top.selling": "Top Selling Product",
    "edit.profile": "Edit Profile",
    "demo.mode": "Demo Mode",
    "switch.dashboard": "Switch Dashboard",

    // Orders
    "order.recent": "Recent Orders",
    "order.all": "All Orders",
    "order.pending": "Pending",
    "order.completed": "Completed",
    "order.delivered": "Delivered",
    "order.in.transit": "In Transit",
    "order.accept": "Accept",
    "order.reject": "Reject",

    // Features
    "feature.compare.prices": "Compare prices from multiple suppliers",
    "feature.bulk.orders": "Place bulk orders and save money",
    "feature.track.delivery": "Track deliveries",
    "feature.ratings.reviews": "View ratings and reviews",
    "feature.list.products": "List your products",
    "feature.manage.inventory": "Manage inventory",
    "feature.track.orders": "Track orders",
    "feature.sales.analytics": "View sales analytics",

    // Why Choose
    "why.choose": "Why Choose FreshConnect?",
    "why.trusted.network": "Trusted Network",
    "why.trusted.desc": "Verified suppliers and vendors",
    "why.rating.system": "Rating System",
    "why.rating.desc": "Transparent reviews and ratings",
    "why.local.supply": "Local Supply",
    "why.local.desc": "Suppliers near you",

    // Actions
    "action.add.product": "Add New Product",
    "action.update.inventory": "Update Inventory",
    "action.quick.actions": "Quick Actions",
    "action.view.all": "View All",
    "action.contact.whatsapp": "Contact on WhatsApp",

    // Messages
    "msg.no.favorites": "No favorite items yet",
    "msg.add.favorites": "Add products to favorites",
    "msg.already.account": "Already have an account?",
    "msg.new.user": "New user?",
    "msg.digitizing.street.food": "Digitizing the street food industry",

    // Cities
    "city.mumbai": "Mumbai",
    "city.delhi": "Delhi",
    "city.pune": "Pune",
    "city.bangalore": "Bangalore",
    "city.hyderabad": "Hyderabad",
    "city.chennai": "Chennai",
  },
  hi: {
    // Common
    "app.name": "FreshConnect",
    "app.tagline": "स्ट्रीट फूड वेंडर्स के लिए सबसे अच्छा मार्केटप्लेस",
    "app.description": "विश्वसनीय स्थानीय आपूर्तिकर्ताओं से सीधे किफायती कच्चा माल प्राप्त करें",
    login: "लॉगिन",
    signup: "साइन अप",
    back: "वापस जाएं",
    submit: "सबमिट करें",
    cancel: "रद्द करें",
    save: "सेव करें",
    edit: "एडिट",
    delete: "डिलीट",
    view: "देखें",
    filter: "फिल्टर",
    search: "खोजें",
    loading: "लोड हो रहा है...",

    // Navigation
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क",
    "nav.help": "सहायता",
    "nav.dashboard": "डैशबोर्ड",
    "nav.products": "प्रोडक्ट्स",
    "nav.orders": "ऑर्डर्स",
    "nav.profile": "प्रोफाइल",
    "nav.analytics": "एनालिटिक्स",
    "nav.browse": "ब्राउज़",
    "nav.favorites": "पसंदीदा",
    "nav.overview": "ओवरव्यू",

    // User Types
    vendor: "वेंडर",
    supplier: "सप्लायर",
    "vendor.join": "वेंडर के रूप में ज्वाइन करें",
    "supplier.join": "सप्लायर के रूप में ज्वाइन करें",
    "vendor.signup": "वेंडर साइन अप",
    "supplier.signup": "सप्लायर साइन अप",
    "vendor.description": "बेहतर दामों में कच्चा माल खरीदें",
    "supplier.description": "अपने प्रोडक्ट्स बेचें और बिजनेस बढ़ाएं",

    // Forms
    "form.name": "पूरा नाम",
    "form.phone": "मोबाइल नंबर",
    "form.email": "ईमेल (वैकल्पिक)",
    "form.business.name": "बिजनेस का नाम",
    "form.shop.name": "दुकान का नाम",
    "form.location": "लोकेशन",
    "form.category": "कैटेगरी",
    "form.select.city": "अपना शहर चुनें",
    "form.select.category": "कैटेगरी चुनें",
    "form.agree.terms": "मैं नियम और शर्तों से सहमत हूं",
    "form.otp": "OTP",
    "form.otp.sent": "OTP भेजा गया है",
    "form.send.otp": "OTP भेजें",
    "form.change.number": "नंबर बदलें",

    // Categories
    "category.vegetables": "सब्जियां",
    "category.spices": "मसाले",
    "category.oil": "तेल",
    "category.grains": "अनाज",
    "category.dairy": "डेयरी",
    "category.chaat": "चाट",
    "category.dosa": "डोसा",
    "category.vada.pav": "वड़ा पाव",
    "category.biryani": "बिरयानी",
    "category.juice": "जूस",
    "category.other": "अन्य",

    // Products
    "product.onion": "प्याज",
    "product.potato": "आलू",
    "product.tomato": "टमाटर",
    "product.turmeric": "हल्दी पाउडर",
    "unit.kg": "किलो",
    "unit.liter": "लीटर",
    "add.to.cart": "कार्ट में डालें",
    "out.of.stock": "स्टॉक खत्म",
    "in.stock": "स्टॉक में",
    "price.per": "प्रति",

    // Dashboard
    "dashboard.vendor": "वेंडर डैशबोर्ड",
    "dashboard.supplier": "सप्लायर डैशबोर्ड",
    "dashboard.panel": "पैनल",
    "stats.monthly.spend": "इस महीने खर्च",
    "stats.total.orders": "कुल ऑर्डर्स",
    "stats.today.sales": "आज की बिक्री",
    "stats.total.products": "कुल प्रोडक्ट्स",
    "stats.pending.orders": "पेंडिंग ऑर्डर्स",
    "stats.this.month": "इस महीने",
    "dashboard.title": "डैशबोर्ड",
    "cart.items": "कार्ट में आइटम्स",
    "cart.total": "कुल",
    "product.description": "विवरण",
    "stock.update": "स्टॉक अपडेट करें",
    "order.accept": "एक्सेप्ट",
    "order.reject": "रिजेक्ट",
    "sales.analytics": "बिक्री एनालिटिक्स",
    "monthly.trend": "मासिक ट्रेंड",
    "top.products": "टॉप प्रोडक्ट्स",
    sold: "बेचा",
    revenue: "आय",
    "average.order": "औसत ऑर्डर वैल्यू",
    "top.selling": "टॉप सेलिंग प्रोडक्ट",
    "edit.profile": "प्रोफाइल एडिट करें",
    "demo.mode": "डेमो मोड",
    "switch.dashboard": "डैशबोर्ड स्विच करें",

    // Orders
    "order.recent": "हाल के ऑर्डर्स",
    "order.all": "सभी ऑर्डर्स",
    "order.pending": "पेंडिंग",
    "order.completed": "पूरा",
    "order.delivered": "डिलीवर हो गया",
    "order.in.transit": "रास्ते में",
    "order.accept": "एक्सेप्ट",
    "order.reject": "रिजेक्ट",

    // Features
    "feature.compare.prices": "कई आपूर्तिकर्ताओं से दाम तुलना करें",
    "feature.bulk.orders": "बल्क ऑर्डर करें और पैसे बचाएं",
    "feature.track.delivery": "डिलीवरी ट्रैक करें",
    "feature.ratings.reviews": "रेटिंग और रिव्यू देखें",
    "feature.list.products": "अपने प्रोडक्ट्स लिस्ट करें",
    "feature.manage.inventory": "इन्वेंटरी मैनेज करें",
    "feature.track.orders": "ऑर्डर ट्रैक करें",
    "feature.sales.analytics": "सेल्स एनालिटिक्स देखें",

    // Why Choose
    "why.choose": "क्यों चुनें FreshConnect?",
    "why.trusted.network": "विश्वसनीय नेटवर्क",
    "why.trusted.desc": "सत्यापित आपूर्तिकर्ता और वेंडर्स",
    "why.rating.system": "रेटिंग सिस्टम",
    "why.rating.desc": "पारदर्शी रिव्यू और रेटिंग",
    "why.local.supply": "लोकल सप्लाई",
    "why.local.desc": "आपके आस-पास के आपूर्तिकर्ता",

    // Actions
    "action.add.product": "नया प्रोडक्ट जोड़ें",
    "action.update.inventory": "इन्वेंटरी अपडेट करें",
    "action.quick.actions": "क्विक एक्शन्स",
    "action.view.all": "सभी देखें",
    "action.contact.whatsapp": "WhatsApp पर संपर्क करें",

    // Messages
    "msg.no.favorites": "अभी तक कोई पसंदीदा आइटम नहीं",
    "msg.add.favorites": "प्रोडक्ट्स को पसंदीदा में जोड़ें",
    "msg.already.account": "पहले से अकाउंट है?",
    "msg.new.user": "नया यूजर हैं?",
    "msg.digitizing.street.food": "स्ट्रीट फूड इंडस्ट्री को डिजिटल बनाना",

    // Cities
    "city.mumbai": "मुंबई",
    "city.delhi": "दिल्ली",
    "city.pune": "पुणे",
    "city.bangalore": "बैंगलोर",
    "city.hyderabad": "हैदराबाद",
    "city.chennai": "चेन्नई",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("hi")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
