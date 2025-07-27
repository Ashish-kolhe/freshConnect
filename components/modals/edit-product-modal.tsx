"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useDemoStore, type Product } from "@/lib/demo-store"

interface EditProductModalProps {
  product: Product
  trigger?: React.ReactNode
}

export function EditProductModal({ product, trigger }: EditProductModalProps) {
  const { t, language } = useLanguage()
  const { updateProduct, addNotification } = useDemoStore()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: product.name,
    nameEn: product.nameEn,
    price: product.price.toString(),
    unit: product.unit,
    unitEn: product.unitEn,
    stock: product.stock.toString(),
    description: product.description,
    descriptionEn: product.descriptionEn,
    category: product.category,
    categoryEn: product.categoryEn,
    minOrderQuantity: product.minOrderQuantity.toString(),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateProduct(product.id, {
      name: formData.name,
      nameEn: formData.nameEn,
      price: Number(formData.price),
      unit: formData.unit,
      unitEn: formData.unitEn,
      stock: Number(formData.stock),
      inStock: Number(formData.stock) > 0,
      status: Number(formData.stock) > 0 ? "active" : "out_of_stock",
      description: formData.description,
      descriptionEn: formData.descriptionEn,
      category: formData.category,
      categoryEn: formData.categoryEn,
      minOrderQuantity: Number(formData.minOrderQuantity),
    })

    addNotification({
      userId: 999,
      title: "प्रोडक्ट अपडेट किया गया",
      titleEn: "Product Updated",
      message: `${formData.name} की जानकारी अपडेट की गई`,
      messageEn: `${formData.name} information updated`,
      type: "system",
      isRead: false,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="outline" className="mobile-button bg-transparent">
            <Edit className="w-3 h-3 mr-1" />
            {language === "hi" ? "एडिट" : "Edit"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">{language === "hi" ? "प्रोडक्ट एडिट करें" : "Edit Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm">{language === "hi" ? "प्रोडक्ट का नाम" : "Product Name"} *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mobile-input"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">{language === "hi" ? "कीमत" : "Price"} *</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mobile-input"
                required
              />
            </div>
            <div>
              <Label className="text-sm">{language === "hi" ? "स्टॉक" : "Stock"} *</Label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="mobile-input"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-sm">{language === "hi" ? "विवरण" : "Description"}</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mobile-input min-h-[60px]"
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 mobile-button">
              {language === "hi" ? "रद्द करें" : "Cancel"}
            </Button>
            <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600 mobile-button">
              {language === "hi" ? "अपडेट करें" : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
