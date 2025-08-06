"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { priceCrawler, getLastUpdateTime } from "@/lib/price-crawler"
import { toast } from "sonner"
import { refreshProductsFromStorage } from "@/data/products"

interface PriceUpdateState {
  isUpdating: boolean
  lastUpdate: Date | null
  updateCount: number
  error: string | null
  lastLocalStorageRefresh: Date | null
}

export function usePriceUpdater() {
  const [state, setState] = useState<PriceUpdateState>({
    isUpdating: false,
    lastUpdate: null,
    updateCount: 0,
    error: null,
    lastLocalStorageRefresh: null,
  })

  const hasInitializedRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Initialize state with last update time
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      lastUpdate: getLastUpdateTime(),
    }))
  }, [])

  const updatePrices = useCallback(
    async (products: any[]) => {
      if (state.isUpdating) {
        console.log("Price updater: Already updating, skipping...")
        return
      }

      setState((prev) => ({ ...prev, isUpdating: true, error: null }))

      try {
        const result = await priceCrawler.updatePrices(products)

        setState((prev) => ({
          ...prev,
          isUpdating: false,
          lastUpdate: new Date(),
          updateCount: result.updated,
          error: result.errors.length > 0 ? result.errors.join(", ") : null,
        }))

        if (result.success && result.updated > 0) {
          toast("Cập nhật giá thành công",{
            description: `Đã cập nhật ${result.updated} sản phẩm từ ${result.total} sản phẩm`,
          })

          // Force refresh localStorage immediately
          refreshLocalStorage()

          // Dispatch additional events to ensure UI updates
          window.dispatchEvent(new Event("pricesUpdated"))

          // Reload page to show updated prices after delay
          timeoutRef.current = setTimeout(() => {
            window.location.reload()
          }, 2000)
        } else if (result.errors.length > 0) {
          toast("Có lỗi khi cập nhật giá",{
            description: result.errors[0],
            // variant: "destructive",
          })
        } else {
          console.log("Price updater: No changes detected")
        }

        return result
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Lỗi không xác định"

        setState((prev) => ({
          ...prev,
          isUpdating: false,
          error: errorMessage,
        }))

        toast("Lỗi cập nhật giá",{
          description: errorMessage,
          // variant: "destructive",
        })

        throw error
      }
    },
    [state.isUpdating, toast],
  )

  const checkAndUpdateIfNeeded = useCallback(
    async (products: any[]) => {
      // Only run once per component instance
      if (hasInitializedRef.current || state.isUpdating) {
        return
      }

      // Use the crawler's throttled check method
      if (priceCrawler.shouldCheckForUpdate()) {
        hasInitializedRef.current = true
        console.log("Price updater: Auto-checking for price updates...")

        try {
          await updatePrices(products)
        } catch (error) {
          console.error("Price updater: Auto-update failed:", error)
        }
      } else {
        // Mark as initialized even if we don't update to prevent repeated calls
        hasInitializedRef.current = true
      }
    },
    [updatePrices, state.isUpdating],
  )

  const refreshLocalStorage = useCallback(() => {
    // Force immediate refresh of products data
    const refreshedProducts = refreshProductsFromStorage()
    console.log("Force refreshed products:", refreshedProducts.length)

    // Dispatch event to trigger refresh at other components
    window.dispatchEvent(new Event("localStorageRefresh"))
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ngan-luong-products-updated",
        newValue: JSON.stringify(refreshedProducts),
      }),
    )

    setState((prev) => ({
      ...prev,
      lastLocalStorageRefresh: new Date(),
    }))

    console.log("Local storage refreshed at:", new Date().toLocaleTimeString())
  }, [])

  // Auto refresh localStorage every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      refreshLocalStorage()
    }, 60000) // 1 minute

    return () => clearInterval(interval)
  }, [refreshLocalStorage])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    ...state,
    updatePrices,
    checkAndUpdateIfNeeded,
    refreshLocalStorage,
  }
}
