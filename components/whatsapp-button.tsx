"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  className?: string
}

export function WhatsAppButton({
  phoneNumber,
  message = "नमस्ते! मुझे आपके प्रोडक्ट के बारे में जानकारी चाहिए।",
  className,
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button onClick={handleWhatsAppClick} className={`bg-green-500 hover:bg-green-600 text-white ${className}`}>
      <MessageCircle className="w-4 h-4 mr-2" />
      WhatsApp पर संपर्क करें
    </Button>
  )
}
