"use client"
import { useEffect } from "react"
import { CartPage } from "@/components/cart/cart-page"

export default function Page() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <CartPage />
}
