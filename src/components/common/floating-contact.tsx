"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, X } from "lucide-react"

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleContact = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50">
      {/* Contact Icons - Show when open */}
      {isOpen && (
        <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4 animate-in slide-in-from-bottom-2 duration-300">
          {/* Zalo Contact */}
          <a
            href="https://zalo.me/your-zalo-oa-id"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-500 font-bold text-xs sm:text-sm">Z</span>
              </div>
            </div>
            {/* Tooltip */}
            <div className="absolute right-14 sm:right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Chat qua Zalo
            </div>
          </a>

          {/* Messenger Contact */}
          <a
            href="https://m.me/your-facebook-page-id"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            {/* Tooltip */}
            <div className="absolute right-14 sm:right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Chat qua Messenger
            </div>
          </a>

          {/* Phone Call Contact */}
          <a href="tel:+84123456789" className="group relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            {/* Tooltip */}
            <div className="absolute right-14 sm:right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Gọi điện thoại
            </div>
          </a>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={toggleContact}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
        size="icon"
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        )}
      </Button>
    </div>
  )
}
