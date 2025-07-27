"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useDemoStore } from "@/lib/demo-store"

interface AddProductModalProps {
  trigger?: React.ReactNode
}

export function AddProductModal({ trigger }: AddProductModalProps) {
  const { t, language } = useLanguage()
  const { addProduct, addNotification } = useDemoStore()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    price: "",
    unit: "किलो",
    unitEn: "kg",
    stock: "",
    description: "",
    descriptionEn: "",
    category: "",
    categoryEn: "",
    minOrderQuantity: "1",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProduct = {
      name: formData.name,
      nameEn: formData.nameEn || formData.name,
      supplier: "आपका बिजनेस",
      supplierEn: "Your Business",
      supplierId: 999,
      price: Number(formData.price),
      unit: formData.unit,
      unitEn: formData.unitEn,
      rating: 4.0,
      location: "आपकी लोकेशन",
      locationEn: "Your Location",
      image: `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(formData.name)}`,
      inStock: Number(formData.stock) > 0,
      stock: Number(formData.stock),
      sold: 0,
      description: formData.description,
      descriptionEn: formData.descriptionEn || formData.description,
      category: formData.category,
      categoryEn: formData.categoryEn,
      status: "active" as const,
      minOrderQuantity: Number(formData.minOrderQuantity),
    }

    addProduct(newProduct)

    addNotification({
      userId: 999,
      title: "नया प्रोडक्ट जोड़ा गया",
      titleEn: "New Product Added",
      message: `${formData.name} सफलतापूर्वक जोड़ा गया`,
      messageEn: `${formData.name} added successfully`,
      type: "system",
      isRead: false,
    })

    setFormData({
      name: "",
      nameEn: "",
      price: "",
      unit: "किलो",
      unitEn: "kg",
      stock: "",
      description: "",
      descriptionEn: "",
      category: "",
      categoryEn: "",
      minOrderQuantity: "1",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-green-500 hover:bg-green-600 mobile-button">
            <Plus className="w-4 h-4 mr-2" />
            {t("action.add.product")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">{t("action.add.product")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm">{language === "hi" ? "प्रोडक्ट का नाम" : "Product Name"} *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={language === "hi" ? "जैसे: ताजा प्याज" : "e.g: Fresh Onions"}
              className="mobile-input"
              required
            />
          </div>

          {language === "en" && (
            <div>
              <Label className="text-sm">Hindi Name</Label>
              <Input
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="हिंदी में नाम"
                className="mobile-input"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">{language === "hi" ? "कीमत" : "Price"} *</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="25"
                className="mobile-input"
                required
              />
            </div>
            <div>
              <Label className="text-sm">{language === "hi" ? "यूनिट" : "Unit"} *</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger className="mobile-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="किलो">किलो / kg</SelectItem>
                  <SelectItem value="लीटर">लीटर / liter</SelectItem>
                  <SelectItem value="पैकेट">पैकेट / packet</SelectItem>
                  <SelectItem value="पीस">पीस / piece</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">{language === "hi" ? "स्टॉक" : "Stock"} *</Label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="100"
                className="mobile-input"
                required
              />
            </div>
            <div>
              <Label className="text-sm">{language === "hi" ? "मिन ऑर्डर" : "Min Order"}</Label>
              <Input
                type="number"
                value={formData.minOrderQuantity}
                onChange={(e) => setFormData({ ...formData, minOrderQuantity: e.target.value })}
                placeholder="1"
                className="mobile-input"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm">{language === "hi" ? "कैटेगरी" : "Category"} *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                const categoryMap: { [key: string]: string } = {
                  vegetables: "Vegetables",
                  spices: "Spices",
                  grains: "Grains",
                  dairy: "Dairy",
                  oil: "Oil & Ghee",
                }
                setFormData({
                  ...formData,
                  category: value,
                  categoryEn: categoryMap[value] || value,
                })
              }}
            >
              <SelectTrigger className="mobile-input">
                <SelectValue placeholder={language === "hi" ? "कैटेगरी चुनें" : "Select category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetables">{t("category.vegetables")}</SelectItem>
                <SelectItem value="spices">{t("category.spices")}</SelectItem>
                <SelectItem value="grains">{t("category.grains")}</SelectItem>
                <SelectItem value="dairy">{t("category.dairy")}</SelectItem>
                <SelectItem value="oil">{t("category.oil")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm">{language === "hi" ? "विवरण" : "Description"}</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={language === "hi" ? "प्रोडक्ट के बारे में बताएं..." : "Tell about your product..."}
              className="mobile-input min-h-[60px]"
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 mobile-button">
              {language === "hi" ? "रद्द करें" : "Cancel"}
            </Button>
            <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 mobile-button">
              {language === "hi" ? "जोड़ें" : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
