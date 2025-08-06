"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Truck, Store } from "lucide-react"
import { Controller } from "react-hook-form"
import { useState, useEffect } from "react"
import type { DeliveryMethodProps } from "./types"

interface City {
  Id: string
  Name: string
  Districts: District[]
}

interface District {
  Id: string
  Name: string
  Wards: Ward[]
}

interface Ward {
  Id: string
  Name: string
}

export function DeliveryMethod({ form }: DeliveryMethodProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form
  const deliveryMethod = watch("deliveryMethod")

  const [cities, setCities] = useState<City[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")

  // Load cities data on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
        const data = await response.json()
        setCities(data)
      } catch (error) {
        console.error("Error fetching cities data:", error)
      }
    }
    fetchCities()
  }, [])

  // Handle city selection
  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId)
    setSelectedDistrict("")
    setDistricts([])
    setWards([])
    setValue("district", "")
    setValue("ward", "")

    if (cityId) {
      const selectedCityData = cities.find((city) => city.Id === cityId)
      if (selectedCityData) {
        setDistricts(selectedCityData.Districts)
      }
    }
  }

  // Handle district selection
  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrict(districtId)
    setWards([])
    setValue("ward", "")

    if (districtId && selectedCity) {
      const selectedCityData = cities.find((city) => city.Id === selectedCity)
      if (selectedCityData) {
        const selectedDistrictData = selectedCityData.Districts.find((district) => district.Id === districtId)
        if (selectedDistrictData) {
          setWards(selectedDistrictData.Wards)
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base sm:text-lg">
          <Truck className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Hình thức nhận hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Controller
          name="deliveryMethod"
          control={control}
          render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
              <div className="flex items-start space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
                <Label htmlFor="delivery" className="flex flex-col sm:flex-row sm:items-center cursor-pointer text-sm">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-2" />
                    Giao hàng tận nơi
                  </div>
                  <span className="mt-1 sm:mt-0 sm:ml-2 text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded inline-block">
                    Phí thương lượng
                  </span>
                </Label>
              </div>
              <div className="flex items-start space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                <Label htmlFor="pickup" className="flex flex-col sm:flex-row sm:items-center cursor-pointer text-sm">
                  <div className="flex items-center">
                    <Store className="w-4 h-4 mr-2" />
                    Nhận tại cửa hàng
                  </div>
                  <span className="mt-1 sm:mt-0 sm:ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded inline-block">
                    Miễn phí
                  </span>
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.deliveryMethod && <p className="text-red-500 text-xs">{errors.deliveryMethod.message}</p>}

        {deliveryMethod === "delivery" && (
          <div className="space-y-4 p-3 sm:p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <h4 className="font-medium text-sm sm:text-base">Địa chỉ giao hàng</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="province" className="text-sm">
                  Tỉnh/Thành phố *
                </Label>
                <Controller
                  name="province"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleCityChange(value)
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="mt-1 h-10">
                        <SelectValue placeholder="Chọn tỉnh thành" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.Id} value={city.Id}>
                            {city.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province.message}</p>}
              </div>

              <div>
                <Label htmlFor="district" className="text-sm">
                  Quận/Huyện *
                </Label>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleDistrictChange(value)
                      }}
                      value={field.value}
                      disabled={!selectedCity}
                    >
                      <SelectTrigger className="mt-1 h-10">
                        <SelectValue placeholder="Chọn quận huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.Id} value={district.Id}>
                            {district.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <Label htmlFor="ward" className="text-sm">
                  Phường/Xã *
                </Label>
                <Controller
                  name="ward"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDistrict}>
                      <SelectTrigger className="mt-1 h-10">
                        <SelectValue placeholder="Chọn phường xã" />
                      </SelectTrigger>
                      <SelectContent>
                        {wards.map((ward) => (
                          <SelectItem key={ward.Id} value={ward.Id}>
                            {ward.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.ward && <p className="text-red-500 text-xs mt-1">{errors.ward.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-sm">
                Địa chỉ chi tiết *
              </Label>
              <Textarea
                id="address"
                {...register("address")}
                placeholder="Số nhà, tên đường..."
                className="mt-1 text-sm"
                rows={2}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
          </div>
        )}

        {deliveryMethod === "pickup" && (
          <div className="space-y-4 p-3 sm:p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <h4 className="font-medium text-sm sm:text-base">Chọn cửa hàng</h4>

            <Controller
              name="store"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-auto min-h-[40px]">
                    <SelectValue placeholder="Chọn cửa hàng để nhận hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="da-nang">
                      <div className="py-1">
                        <div className="font-medium text-sm">Ngân Lượng Silver - Cửa hàng Đà Nẵng</div>
                        <div className="text-xs text-gray-500">45 Bàu Hạc 8, Thanh Khê, Đà Nẵng</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.store && <p className="text-red-500 text-xs mt-1">{errors.store.message}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
