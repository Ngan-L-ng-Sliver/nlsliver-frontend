import { type Product, saveUpdatedProducts } from "@/data/products"

// Utility functions for string similarity
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null))

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + indicator)
    }
  }

  return matrix[str2.length][str1.length]
}

function calculateSimilarity(str1: string, str2: string): number {
  const maxLength = Math.max(str1.length, str2.length)
  if (maxLength === 0) return 1

  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase())
  return (maxLength - distance) / maxLength
}

// Normalize product name for better matching
function normalizeProductName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// Product interface for crawled data
interface CrawledProduct {
  name: string
  code: string
  sellPrice: number
  buyPrice: number
  inStock: boolean
  weight?: string
}

// Price update result
interface PriceUpdateResult {
  success: boolean
  updated: number
  total: number
  errors: string[]
  updatedProducts: Array<{
    id: number
    name: string
    oldPrice: number
    newPrice: number
  }>
}

class PriceCrawler {
  private readonly baseUrl = "https://silver.phuquygroup.vn"
  private readonly corsProxy = "https://api.allorigins.win/raw?url="
  private isUpdating = false
  private lastCheckTime = 0
  private readonly CHECK_COOLDOWN = 1 * 60 * 1000 // 1 minute cooldown between checks

  // Parse price from Vietnamese currency format
  private parsePrice(priceStr: string): number {
    if (!priceStr) return 0

    // Remove "đ" and other non-numeric characters except commas and dots
    const cleanPrice = priceStr.replace(/[^\d.,]/g, "")

    // Handle Vietnamese number format (1,503,000)
    if (cleanPrice.includes(",")) {
      return Number.parseInt(cleanPrice.replace(/,/g, "")) || 0
    }

    return Number.parseInt(cleanPrice) || 0
  }

  // Extract product code from name (format: "Product Name -CODE")
  private extractProductCode(fullName: string): { name: string; code: string } {
    const parts = fullName.split(" -")
    if (parts.length >= 2) {
      return {
        name: parts[0].trim(),
        code: parts[1].trim(),
      }
    }
    return {
      name: fullName.trim(),
      code: "",
    }
  }

  // Fetch HTML content with CORS proxy
  private async fetchWithProxy(url: string): Promise<string> {
    try {
      const response = await fetch(`${this.corsProxy}${encodeURIComponent(url)}`)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return await response.text()
    } catch (error) {
      console.error("Fetch error:", error)
      throw error
    }
  }

  // Parse HTML and extract product data based on the actual structure
  private parseProductsFromHTML(html: string): CrawledProduct[] {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")
    const products: CrawledProduct[] = []

    // Find product items using the exact selector from the HTML
    const productElements = doc.querySelectorAll(".product-item")

    console.log(`Found ${productElements.length} product elements`)

    productElements.forEach((element, index) => {
      try {
        // Extract product name from h3 tag
        const nameElement = element.querySelector("h3")
        if (!nameElement) return

        const fullName = nameElement.textContent?.trim() || ""
        const { name, code } = this.extractProductCode(fullName)

        if (!name) return

        // Extract sell price
        const sellPriceElement = element.querySelector(".sellprice")
        const sellPriceText = sellPriceElement?.textContent?.trim() || ""
        const sellPrice = this.parsePrice(sellPriceText)

        // Extract buy price
        const buyPriceElement = element.querySelector(".buyprice")
        const buyPriceText = buyPriceElement?.textContent?.trim() || ""
        const buyPrice = this.parsePrice(buyPriceText)

        // Check stock status based on badges
        const badges = element.querySelectorAll(".tm-product-badges span")
        let inStock = true

        badges.forEach((badge) => {
          const badgeText = badge.textContent?.toLowerCase() || ""
          if (badgeText.includes("hết hàng") || badgeText.includes("dừng bán")) {
            inStock = false
          }
        })

        // Extract weight from name if available
        const weightMatch = name.match(/$$([^)]+)$$/)
        const weight = weightMatch ? weightMatch[1] : ""

        if (sellPrice > 0) {
          products.push({
            name: name.trim(),
            code: code.trim(),
            sellPrice,
            buyPrice,
            inStock,
            weight,
          })

          console.log(`Parsed product: ${name} - ${code} - Sell: ${sellPrice} - Buy: ${buyPrice} - Stock: ${inStock}`)
        }
      } catch (error) {
        console.error(`Error parsing product ${index}:`, error)
      }
    })

    return products
  }

  // Crawl products from the website
  async crawlProducts(): Promise<CrawledProduct[]> {
    if (this.isUpdating) {
      console.log("Price crawler: Already updating, skipping...")
      return []
    }

    try {
      this.isUpdating = true
      console.log("Price crawler: Starting to crawl products from", this.baseUrl)

      const html = await this.fetchWithProxy(this.baseUrl)
      const products = this.parseProductsFromHTML(html)

      console.log(`Price crawler: Successfully crawled ${products.length} products`)
      return products
    } catch (error) {
      console.error("Price crawler: Error crawling products:", error)
      throw error
    } finally {
      this.isUpdating = false
    }
  }

  // Match crawled products with existing products
  matchProducts(
    crawledProducts: CrawledProduct[],
    existingProducts: Product[],
  ): Array<{
    existing: Product
    crawled: CrawledProduct
    similarity: number
  }> {
    const matches: Array<{
      existing: Product
      crawled: CrawledProduct
      similarity: number
    }> = []

    for (const crawled of crawledProducts) {
      let bestMatch = null
      let bestSimilarity = 0

      for (const existing of existingProducts) {
        // Calculate similarity based on name
        const crawledNormalized = normalizeProductName(crawled.name)
        const existingNormalized = normalizeProductName(existing.name)
        const nameSimilarity = calculateSimilarity(crawledNormalized, existingNormalized)

        // Bonus points if codes match exactly
        let codeSimilarity = 0
        if (crawled.code && existing.code) {
          codeSimilarity = crawled.code.toLowerCase() === existing.code.toLowerCase() ? 1 : 0
        }

        // Weight the similarity (name 70%, code 30%)
        const totalSimilarity = nameSimilarity * 0.7 + codeSimilarity * 0.3

        if (totalSimilarity > bestSimilarity && totalSimilarity > 0.6) {
          // Lower threshold to 60%
          bestSimilarity = totalSimilarity
          bestMatch = existing
        }
      }

      if (bestMatch) {
        matches.push({
          existing: bestMatch,
          crawled,
          similarity: bestSimilarity,
        })
      }
    }

    return matches.sort((a, b) => b.similarity - a.similarity)
  }

  // Check if we should perform an update check (with cooldown)
  shouldCheckForUpdate(): boolean {
    const now = Date.now()

    // If we've checked recently, don't check again
    if (now - this.lastCheckTime < this.CHECK_COOLDOWN) {
      return false
    }

    this.lastCheckTime = now
    return shouldUpdatePrices()
  }

  // Update prices based on crawled data
  async updatePrices(existingProducts: Product[]): Promise<PriceUpdateResult> {
    const result: PriceUpdateResult = {
      success: false,
      updated: 0,
      total: existingProducts.length,
      errors: [],
      updatedProducts: [],
    }

    // Prevent multiple simultaneous updates
    if (this.isUpdating) {
      result.errors.push("Đang cập nhật, vui lòng chờ...")
      return result
    }

    try {
      const crawledProducts = await this.crawlProducts()

      if (crawledProducts.length === 0) {
        result.errors.push("Không tìm thấy sản phẩm nào từ website nguồn")
        return result
      }

      const matches = this.matchProducts(crawledProducts, existingProducts)

      console.log(
        `Price crawler: Found ${matches.length} product matches out of ${crawledProducts.length} crawled products`,
      )

      // Create a copy of existing products to update
      const updatedProducts = [...existingProducts]

      for (const match of matches) {
        try {
          const { existing, crawled } = match
          let updated = false

          // Find the product in the updated array
          const productIndex = updatedProducts.findIndex((p) => p.id === existing.id)
          if (productIndex === -1) continue

          const product = updatedProducts[productIndex]

          // Update sell price if different
          if (crawled.sellPrice !== product.sellPrice) {
            const oldPrice = product.sellPrice
            product.sellPrice = crawled.sellPrice

            result.updatedProducts.push({
              id: product.id,
              name: product.name,
              oldPrice,
              newPrice: crawled.sellPrice,
            })

            updated = true
            console.log(`Price crawler: Updated ${product.name}: ${oldPrice} -> ${crawled.sellPrice}`)
          }

          // Update buy price if different
          if (crawled.buyPrice !== product.buyPrice) {
            product.buyPrice = crawled.buyPrice
            updated = true
          }

          // Update stock status
          if (crawled.inStock !== product.inStock) {
            product.inStock = crawled.inStock
            product.status = crawled.inStock ? "available" : "out_of_stock"
            updated = true
          }

          if (updated) {
            result.updated++
          }
        } catch (error) {
          result.errors.push(`Lỗi cập nhật sản phẩm ${match.existing.name}: ${error}`)
        }
      }

      result.success = result.updated > 0 || result.errors.length === 0

      // Save updated products to localStorage
      if (result.updated > 0) {
        saveUpdatedProducts(updatedProducts)

        // Dispatch multiple events to ensure all components are notified
        window.dispatchEvent(new Event("localStorageRefresh"))
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "ngan-luong-products-updated",
            newValue: JSON.stringify(updatedProducts),
          }),
        )

        console.log(`Price crawler: Update completed - ${result.updated} products updated and saved to localStorage`)
      } else {
        console.log("Price crawler: No price changes detected")
      }

      return result
    } catch (error) {
      result.errors.push(`Lỗi hệ thống: ${error}`)
      console.error("Price crawler: Update error:", error)
      return result
    }
  }
}

// Export singleton instance
export const priceCrawler = new PriceCrawler()

// Helper function to check if price update is needed (every 1 minute)
export function shouldUpdatePrices(): boolean {
  const lastUpdate = localStorage.getItem("ngan-luong-last-price-update")
  if (!lastUpdate) return true

  const lastUpdateTime = Number.parseInt(lastUpdate)
  const now = Date.now()
  const oneMinute = 1 * 60 * 1000

  return now - lastUpdateTime > oneMinute
}

// Helper function to get last update time
export function getLastUpdateTime(): Date | null {
  const lastUpdate = localStorage.getItem("ngan-luong-last-price-update")
  return lastUpdate ? new Date(Number.parseInt(lastUpdate)) : null
}
