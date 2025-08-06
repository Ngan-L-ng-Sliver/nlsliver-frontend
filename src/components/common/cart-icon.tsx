"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getCartItems, getCartItemCount } from "@/lib/cart"
import Link from "next/link"

export function CartIcon() {
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const items = getCartItems()
      setItemCount(getCartItemCount(items))
    }

    updateCartCount()

    // Listen for cart updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ngan-luong-cart") {
        updateCartCount()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for same-tab updates
    const handleCartUpdate = () => updateCartCount()
    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="text-white hover:bg-slate-700 dark:hover:bg-slate-600 relative">
        <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500">
            {itemCount > 99 ? "99+" : itemCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
