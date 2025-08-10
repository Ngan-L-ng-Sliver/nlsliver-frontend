export interface Store {
  id: number
  name: string
  slug: string
  address: string
  phone: string
  hours: string
  status: "Đang hoạt động" | "Tạm đóng cửa"
  type: "Cửa hàng chính" | "Chi nhánh"
  coordinates: { lat: number; lng: number }
  services: string[]
  image: string
  description?: string
  features?: string[]
  gallery?: string[]
  iframe?: string
}

// Store locations data - chỉ có 1 cửa hàng duy nhất ở Đà Nẵng
export const storeLocations: Store[] = [
  {
    id: 1,
    name: "Ngân Lượng Silver - Cửa hàng chính tại Đà Nẵng",
    slug: "da-nang",
    address: "45 Bàu Hạc 8, Thanh Khê, Đà Nẵng",
    phone: "0763 600 889",
    hours: "8:00 - 18:30 (Thứ 2 - Thứ 7), 8:00 - 17:00 (Chủ Nhật)",
    status: "Đang hoạt động",
    type: "Cửa hàng chính",
    coordinates: { lat: 16.061530967877903, lng: 108.21130291598305 },
    services: ["Mua bán bạc", "Tư vấn đầu tư", "Bảo hành"],
    image:
      "/images/diem ban/da nang 1/53bd9402-cc85-44e2-bdff-08a0bbc3895a.jpeg",
    description:
      "Cửa hàng chính của Ngân Lượng Silver tại Đà Nẵng, với đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực mua bán bạc. Phục vụ khách hàng khu vực miền Trung với chất lượng dịch vụ tốt nhất.",
    features: [
      "Cửa hàng chính duy nhất tại Đà Nẵng",
      "Đội ngũ chuyên gia tư vấn 1+ năm kinh nghiệm",
      "Showroom trưng bày đầy đủ nhất",
      "Tư vấn chuyên sâu về thị trường bạc",
    ],
    gallery: [
      "/images/diem ban/da nang 1/53bd9402-cc85-44e2-bdff-08a0bbc3895a.jpeg",
      "/images/diem ban/da nang 1/1.jpg",
      "/images/diem ban/da nang 1/2.jpg",
      "/images/diem ban/da nang 1/3.jpg",
    ],
    iframe:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d329.93348282148264!2d108.2113500016236!3d16.06155891495908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b5ac8b1aa3%3A0x435fbd08c62f072a!2zNDUgQsOgdSBI4bqhYyA4LCBUaOG6oWMgR2nDoW4sIFRoYW5oIEtow6osIMSQw6AgTuG6tW5nIDU1MDAwMA!5e0!3m2!1svi!2s!4v1753548179105!5m2!1svi!2s",
  },
]

// Utility functions
export const getStoreBySlug = (slug: string): Store | undefined => {
  return storeLocations.find((store) => store.slug === slug)
}

export const getActiveStores = (): Store[] => {
  return storeLocations.filter((store) => store.status === "Đang hoạt động")
}

export const getStoresByType = (type: Store["type"]): Store[] => {
  return storeLocations.filter((store) => store.type === type)
}

export const getAllDistricts = (): string[] => {
  const districts = storeLocations.map((store) => {
    // Extract district from address - this is a simple implementation
    const addressParts = store.address.split(", ")
    return addressParts[addressParts.length - 2] || "Không xác định"
  })
  return ["Tất cả", ...Array.from(new Set(districts))]
}

export const getAllStoreTypes = (): string[] => {
  const types = storeLocations.map((store) => store.type)
  return ["Tất cả", ...Array.from(new Set(types))]
}

export const getAllStatuses = (): string[] => {
  const statuses = storeLocations.map((store) => store.status)
  return ["Tất cả", ...Array.from(new Set(statuses))]
}
