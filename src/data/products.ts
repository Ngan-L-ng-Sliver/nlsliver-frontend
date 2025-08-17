import productsData from "./json/products.json"

// Enum cho trạng thái sản phẩm
export enum ProductStatus {
  AVAILABLE = "available",
  OUT_OF_STOCK = "out_of_stock",
  DISCONTINUED = "discontinued",
  PRE_ORDER = "pre_order",
}

export interface Product {
  id: number
  name: string
  code: string
  weight: string
  sellPrice: number
  buyPrice: number
  category: string
  brand: string
  inStock: boolean
  status: ProductStatus
  createdDate: string
  images: string[]
  description: string
  specifications: Record<string, string>
  features: string[]
}

// Check if localStorage data is outdated compared to JSON data
function isLocalStorageOutdated(): boolean {
  if (typeof window === "undefined") return false

  try {
    const jsonData = productsData as Product[]
    const jsonProductIds = new Set(jsonData.map((p) => p.id))
    const jsonCount = jsonData.length

    // Check updated products first
    const updatedProducts = localStorage.getItem("ngan-luong-products-updated")
    if (updatedProducts) {
      const parsed = JSON.parse(updatedProducts)
      const localProductIds = new Set(parsed.map((p: Product) => p.id))
      const localCount = parsed.length

      // If counts don't match or product IDs don't match, it's outdated
      if (localCount !== jsonCount) {
        console.log(`Product count mismatch: JSON has ${jsonCount}, localStorage has ${localCount}`)
        return true
      }

      // Check if all JSON product IDs exist in localStorage
      for (const id of jsonProductIds) {
        if (!localProductIds.has(id)) {
          console.log(`New product found in JSON: ID ${id}`)
          return true
        }
      }
    }

    // Check initial products
    const initialProducts = localStorage.getItem("ngan-luong-products-initial")
    if (initialProducts) {
      const parsed = JSON.parse(initialProducts)
      const localProductIds = new Set(parsed.map((p: Product) => p.id))
      const localCount = parsed.length

      // If counts don't match or product IDs don't match, it's outdated
      if (localCount !== jsonCount) {
        console.log(`Initial product count mismatch: JSON has ${jsonCount}, localStorage has ${localCount}`)
        return true
      }

      // Check if all JSON product IDs exist in localStorage
      for (const id of jsonProductIds) {
        if (!localProductIds.has(id)) {
          console.log(`New product found in JSON: ID ${id}`)
          return true
        }
      }
    }

    return false
  } catch (error) {
    console.error("Error checking localStorage outdated status:", error)
    return true // If error, assume outdated
  }
}

// Merge new products from JSON with existing localStorage data
function mergeProductsData(): Product[] {
  if (typeof window === "undefined") {
    return productsData as Product[]
  }

  try {
    const jsonData = productsData as Product[]

    // Check if we have updated products in localStorage
    const updatedProducts = localStorage.getItem("ngan-luong-products-updated")
    if (updatedProducts) {
      const localData = JSON.parse(updatedProducts) as Product[]
      const localProductMap = new Map(localData.map((p) => [p.id, p]))

      // Merge: keep updated prices from localStorage, add new products from JSON
      const mergedProducts: Product[] = []

      // Add all products from JSON, preserving localStorage updates where they exist
      for (const jsonProduct of jsonData) {
        const localProduct = localProductMap.get(jsonProduct.id)
        if (localProduct) {
          // Keep the updated product from localStorage (preserves price updates)
          mergedProducts.push(localProduct)
        } else {
          // Add new product from JSON
          console.log(`Adding new product from JSON: ${jsonProduct.name} (ID: ${jsonProduct.id})`)
          mergedProducts.push(jsonProduct)
        }
      }

      console.log(
        `Merged products: ${mergedProducts.length} total (${jsonData.length} from JSON, ${localData.length} from localStorage)`,
      )
      return mergedProducts
    }

    // If no updated products, check initial products
    const initialProducts = localStorage.getItem("ngan-luong-products-initial")
    if (initialProducts) {
      const localData = JSON.parse(initialProducts) as Product[]
      const localProductMap = new Map(localData.map((p) => [p.id, p]))

      // Merge: add new products from JSON to existing initial data
      const mergedProducts: Product[] = []

      // Add all products from JSON
      for (const jsonProduct of jsonData) {
        const localProduct = localProductMap.get(jsonProduct.id)
        if (localProduct) {
          // Keep existing product
          mergedProducts.push(localProduct)
        } else {
          // Add new product from JSON
          console.log(`Adding new product from JSON to initial data: ${jsonProduct.name} (ID: ${jsonProduct.id})`)
          mergedProducts.push(jsonProduct)
        }
      }

      console.log(`Merged initial products: ${mergedProducts.length} total`)
      return mergedProducts
    }

    // No localStorage data, return JSON data
    return jsonData
  } catch (error) {
    console.error("Error merging products data:", error)
    return productsData as Product[]
  }
}

// Force update localStorage with fresh JSON data while preserving price updates
function forceUpdateFromJSON(): Product[] {
  if (typeof window === "undefined") {
    return productsData as Product[]
  }

  try {
    console.log("Force updating localStorage with fresh JSON data...")
    const jsonData = productsData as Product[]

    // Check if we have price-updated products in localStorage
    const updatedProducts = localStorage.getItem("ngan-luong-products-updated")
    if (updatedProducts) {
      const localData = JSON.parse(updatedProducts) as Product[]
      const localProductMap = new Map(localData.map((p) => [p.id, p]))

      // Merge: use JSON structure but preserve price updates
      const mergedProducts: Product[] = []

      for (const jsonProduct of jsonData) {
        const localProduct = localProductMap.get(jsonProduct.id)
        if (localProduct && (localProduct.sellPrice > 0 || localProduct.buyPrice > 0)) {
          // Keep price updates from localStorage but use JSON structure
          mergedProducts.push({
            ...jsonProduct,
            sellPrice: localProduct.sellPrice,
            buyPrice: localProduct.buyPrice,
          })
        } else {
          // Use fresh JSON data
          mergedProducts.push(jsonProduct)
        }
      }

      // Update both initial and updated localStorage
      localStorage.setItem("ngan-luong-products-initial", JSON.stringify(jsonData))
      localStorage.setItem("ngan-luong-products-updated", JSON.stringify(mergedProducts))

      console.log(`Force updated with ${mergedProducts.length} products (preserved price updates)`)
      return mergedProducts
    } else {
      // No price updates, just use fresh JSON data
      localStorage.setItem("ngan-luong-products-initial", JSON.stringify(jsonData))
      console.log(`Force updated with ${jsonData.length} fresh products from JSON`)
      return jsonData
    }
  } catch (error) {
    console.error("Error force updating from JSON:", error)
    return productsData as Product[]
  }
}

// Load products from localStorage if available, otherwise use JSON data and save to localStorage
function loadProducts(): Product[] {
  if (typeof window === "undefined") {
    return productsData as Product[]
  }

  try {
    // Always check if localStorage is outdated on every load (F5)
    if (isLocalStorageOutdated()) {
      console.log("localStorage is outdated, updating with fresh JSON data...")
      return forceUpdateFromJSON()
    }

    // Check if we have updated products in localStorage
    const updatedProducts = localStorage.getItem("ngan-luong-products-updated")
    if (updatedProducts) {
      const parsed = JSON.parse(updatedProducts) as Product[]
      // Always get 'Ngân Lượng Silver' products from JSON
      const jsonData = productsData as Product[]
      const nganLuongSilverProducts = jsonData.filter(p => p.brand === "Ngân Lượng Silver")
      const otherProducts = parsed.filter(p => p.brand !== "Ngân Lượng Silver")
      const merged = [...nganLuongSilverProducts, ...otherProducts]
      console.log("Loading products from localStorage (updated) with Ngân Lượng Silver from JSON:", merged.length)
      return merged
    }

    // Check if we have initial products in localStorage
    const initialProducts = localStorage.getItem("ngan-luong-products-initial")
    if (initialProducts) {
      const parsed = JSON.parse(initialProducts) as Product[]
      // Always get 'Ngân Lượng Silver' products from JSON
      const jsonData = productsData as Product[]
      const nganLuongSilverProducts = jsonData.filter(p => p.brand === "Ngân Lượng Silver")
      const otherProducts = parsed.filter(p => p.brand !== "Ngân Lượng Silver")
      const merged = [...nganLuongSilverProducts, ...otherProducts]
      console.log("Loading products from localStorage (initial) with Ngân Lượng Silver from JSON:", merged.length)
      return merged
    }

    // First time load - save initial data to localStorage
    console.log("First time load - saving initial products to localStorage:", productsData.length)
    localStorage.setItem("ngan-luong-products-initial", JSON.stringify(productsData))
    return productsData as Product[]
  } catch (error) {
    console.error("Error loading products from localStorage:", error)
    return productsData as Product[]
  }
}

// Get current products (always fresh from storage)
export function getProducts(): Product[] {
  return loadProducts()
}

// Refresh products from storage (for real-time updates)
export function refreshProductsFromStorage(): Product[] {
  const products = loadProducts()
  console.log("Refreshed products from storage:", products.length, "products")
  return products
}

// Force refresh products from JSON (useful for development)
export function forceRefreshFromJSON(): Product[] {
  if (typeof window === "undefined") {
    return productsData as Product[]
  }

  try {
    console.log("Force refreshing products from JSON...")

    // Clear localStorage
    localStorage.removeItem("ngan-luong-products-initial")
    localStorage.removeItem("ngan-luong-products-updated")

    // Load fresh data from JSON
    const freshProducts = productsData as Product[]
    localStorage.setItem("ngan-luong-products-initial", JSON.stringify(freshProducts))

    console.log(`Force refreshed ${freshProducts.length} products from JSON`)

    // Dispatch events to update UI
    window.dispatchEvent(new Event("localStorageRefresh"))
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ngan-luong-products-updated",
        newValue: JSON.stringify(freshProducts),
      }),
    )

    return freshProducts
  } catch (error) {
    console.error("Error force refreshing from JSON:", error)
    return productsData as Product[]
  }
}

// Save updated products to localStorage
export function saveUpdatedProducts(products: Product[]): void {
  if (typeof window === "undefined") return

  try {
    const productsJson = JSON.stringify(products)
    localStorage.setItem("ngan-luong-products-updated", productsJson)
    localStorage.setItem("ngan-luong-last-price-update", Date.now().toString())
    console.log("Saved updated products to localStorage:", products.length)

    // Dispatch storage event for cross-tab communication
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ngan-luong-products-updated",
        newValue: productsJson,
      }),
    )

    // Also dispatch custom event for same-tab communication
    window.dispatchEvent(new Event("localStorageRefresh"))
  } catch (error) {
    console.error("Error saving products to localStorage:", error)
  }
}

// Export products with dynamic loading
export const products: Product[] = getProducts()

// Utility function to format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ"
}

// Utility function to get price range for a product
export function getPriceRange(price: number): string {
  if (price < 1000000) return "Dưới 1 triệu"
  if (price < 2000000) return "1-2 triệu"
  if (price < 5000000) return "2-5 triệu"
  if (price < 10000000) return "5-10 triệu"
  if (price < 20000000) return "10-20 triệu"
  return "Trên 20 triệu"
}

// Utility function to get all unique price ranges from products
export function getAllPriceRanges(): string[] {
  const currentProducts = refreshProductsFromStorage()
  const ranges = currentProducts.map((product) => getPriceRange(product.sellPrice))
  return [...new Set(ranges)].sort((a, b) => {
    const order = ["Dưới 1 triệu", "1-2 triệu", "2-5 triệu", "5-10 triệu", "10-20 triệu", "Trên 20 triệu"]
    return order.indexOf(a) - order.indexOf(b)
  })
}

// Utility function to sort products by creation date (newest first)
export function sortProductsByNewest(products: Product[]): Product[] {
  return [...products].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
}

// Utility function to sort products by creation date (oldest first)
export function sortProductsByOldest(products: Product[]): Product[] {
  return [...products].sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime())
}

// Utility function to get products created in the last N days
export function getRecentProducts(days = 30): Product[] {
  const currentProducts = refreshProductsFromStorage()
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  return currentProducts.filter((product) => new Date(product.createdDate) >= cutoffDate)
}

export function getProductById(id: number): Product | undefined {
  const currentProducts = refreshProductsFromStorage()
  return currentProducts.find((product) => product.id === id)
}

export function getRelatedProducts(currentProductId: number, limit = 3): Product[] {
  const currentProducts = refreshProductsFromStorage()
  return currentProducts.filter((product) => product.id !== currentProductId).slice(0, limit)
}

export function getProductsByCategory(category: string): Product[] {
  const currentProducts = refreshProductsFromStorage()
  return currentProducts.filter((product) => product.category === category)
}

export function getAllCategories(): string[] {
  const currentProducts = refreshProductsFromStorage()
  return [...new Set(currentProducts.map((product) => product.category))]
}

export function getAllBrands(): string[] {
  const currentProducts = refreshProductsFromStorage()
  return [...new Set(currentProducts.map((product) => product.brand))]
}

export function getAllStatuses(): string[] {
  const currentProducts = refreshProductsFromStorage()
  return [...new Set(currentProducts.map((product) => product.status))]
}

export function getStatusDisplay(status: string): { text: string; color: string } {
  switch (status) {
    case ProductStatus.AVAILABLE:
      return { text: "Còn hàng", color: "text-green-600 dark:text-green-400" }
    case ProductStatus.OUT_OF_STOCK:
      return { text: "Hết hàng", color: "text-red-600 dark:text-red-400" }
    case ProductStatus.DISCONTINUED:
      return { text: "Dừng bán", color: "text-gray-600 dark:text-gray-400" }
    case ProductStatus.PRE_ORDER:
      return { text: "Đặt hàng", color: "text-blue-600 dark:text-blue-400" }
    default:
      return { text: "Không xác định", color: "text-gray-600 dark:text-gray-400" }
  }
}

export function getStatusDisplayText(status: string): string {
  switch (status) {
    case ProductStatus.AVAILABLE:
      return "Còn hàng"
    case ProductStatus.OUT_OF_STOCK:
      return "Hết hàng"
    case ProductStatus.DISCONTINUED:
      return "Dừng bán"
    case ProductStatus.PRE_ORDER:
      return "Đặt hàng"
    default:
      return "Không xác định"
  }
}

// Utility function to filter products by status
export function getProductsByStatus(status: ProductStatus): Product[] {
  const currentProducts = refreshProductsFromStorage()
  return currentProducts.filter((product) => product.status === status)
}

// Utility function to get available products for purchase
export function getAvailableProducts(): Product[] {
  const currentProducts = refreshProductsFromStorage()
  return currentProducts.filter(
    (product) => product.status === ProductStatus.AVAILABLE || product.status === ProductStatus.PRE_ORDER,
  )
}
