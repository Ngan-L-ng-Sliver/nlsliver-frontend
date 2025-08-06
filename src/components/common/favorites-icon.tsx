"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFavoriteCount } from "@/lib/favorites"

export function FavoritesIcon() {
  const [favoriteCount, setFavoriteCount] = useState(0)

  useEffect(() => {
    // Initialize count
    setFavoriteCount(getFavoriteCount())

    // Listen for favorites updates
    const handleFavoritesUpdate = () => {
      setFavoriteCount(getFavoriteCount())
    }

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate)
    return () => window.removeEventListener("favoritesUpdated", handleFavoritesUpdate)
  }, [])

  return (
    <Link href="/yeu-thich">
      <Button
        variant="ghost"
        size="icon"
        className="relative text-white hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
      >
        <Heart className="w-5 h-5" />
        {favoriteCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {favoriteCount > 99 ? "99+" : favoriteCount}
          </span>
        )}
      </Button>
    </Link>
  )
}
