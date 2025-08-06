import type { Store } from "@/data/stores"

/**
 * Determines if a store is currently open based on its operating hours and status.
 * @param store The store object.
 * @returns True if the store is currently open, false otherwise.
 */
export function isStoreOpen(store: Store): boolean {
  // If store is manually set to "Tạm đóng cửa", it's always closed regardless of hours.
  if (store.status === "Tạm đóng cửa") {
    return false
  }

  const now = new Date()
  const currentDay = now.getDay() // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTimeInMinutes = currentHour * 60 + currentMinute

  // Store is open Monday to Sunday
  // Monday-Saturday: 8:00 - 18:30
  // Sunday: 8:00 - 17:00

  let openTimeInMinutes: number
  let closeTimeInMinutes: number

  if (currentDay === 0) {
    // Sunday: 8:00 - 17:00
    openTimeInMinutes = 8 * 60 // 8:00 AM
    closeTimeInMinutes = 17 * 60 // 5:00 PM
  } else {
    // Monday-Saturday: 8:00 - 18:30
    openTimeInMinutes = 8 * 60 // 8:00 AM
    closeTimeInMinutes = 18 * 60 + 30 // 6:30 PM
  }

  // Check if current time is within operating hours
  return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes
}
