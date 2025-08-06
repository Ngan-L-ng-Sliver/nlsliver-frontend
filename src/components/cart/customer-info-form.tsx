"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "lucide-react"
import { Controller } from "react-hook-form"
import type { CustomerInfoFormProps } from "./types"

export function CustomerInfoForm({ form }: CustomerInfoFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base sm:text-lg">
          <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Thông tin khách hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gender" className="text-sm">
              Danh xưng *
            </Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 h-10">
                    <SelectValue placeholder="Chọn danh xưng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Anh</SelectItem>
                    <SelectItem value="ms">Chị</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>

          <div>
            <Label htmlFor="name" className="text-sm">
              Họ và tên *
            </Label>
            <Input id="name" {...register("name")} placeholder="Nhập họ và tên" className="mt-1 h-10 text-sm" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" className="text-sm">
              Số điện thoại *
            </Label>
            <Input id="phone" {...register("phone")} placeholder="Nhập số điện thoại" className="mt-1 h-10 text-sm" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Nhập email (để nhận hoá đơn online)"
              className="mt-1 h-10 text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
