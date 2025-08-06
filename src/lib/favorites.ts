export interface FavoriteItem {
  id: number
  name: string
  code: string
  weight: string
  sellPrice: number
  buyPrice: number
  image: string
  category: string
}

const FAVORITES_KEY = "ngan-luong-favorites"

export function getFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return []

  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error("Error getting favorites:", error)
    return []
  }
}

export function saveFavorites(favorites: FavoriteItem[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    // Dispatch event to notify other components
    window.dispatchEvent(new Event("favoritesUpdated"))
  } catch (error) {
    console.error("Error saving favorites:", error)
  }
}

export function addToFavorites(item: FavoriteItem): void {
  const favorites = getFavorites()
  const exists = favorites.find((fav) => fav.id === item.id)

  if (!exists) {
    favorites.push(item)
    saveFavorites(favorites)
  }
}

export function removeFromFavorites(itemId: number): void {
  const favorites = getFavorites()
  const filtered = favorites.filter((fav) => fav.id !== itemId)
  saveFavorites(filtered)
}

export function isFavorite(itemId: number): boolean {
  const favorites = getFavorites()
  return favorites.some((fav) => fav.id === itemId)
}

export function toggleFavorite(item: FavoriteItem): boolean {
  if (isFavorite(item.id)) {
    removeFromFavorites(item.id)
    return false
  } else {
    addToFavorites(item)
    return true
  }
}

export function getFavoriteCount(): number {
  return getFavorites().length
}
