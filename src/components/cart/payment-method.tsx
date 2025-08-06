"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Copy, CheckCircle } from "lucide-react"
import { Controller } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { PaymentMethodProps } from "./types"

export function PaymentMethod({ form }: PaymentMethodProps) {
  const {
    control,
    formState: { errors },
    watch,
  } = form

  const [copiedField, setCopiedField] = useState<string | null>(null)
  const selectedPaymentMethod = watch("paymentMethod")

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base sm:text-lg">
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Phương thức thanh toán
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
              <div className="flex items-start space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="bank" id="bank" className="mt-1" />
                <Label htmlFor="bank" className="flex flex-col sm:flex-row sm:items-center cursor-pointer text-sm">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Chuyển khoản ngân hàng
                  </div>
                  <span className="mt-1 sm:mt-0 sm:ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded inline-block">
                    Khuyến nghị
                  </span>
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod.message}</p>}

        {/* Bank Transfer Details */}
        {selectedPaymentMethod === "bank" && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-sm mb-3 text-blue-900 dark:text-blue-100">Thông tin chuyển khoản</h4>

            <div className="space-y-3 text-sm">
              {/* Bank Name */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Ngân hàng:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">MB Bank (Quân Đội)</span>
                </div>
              </div>

              {/* Account Holder */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Chủ tài khoản:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-right">CONG TY TNHH MTV VANG BAC NGAN LUONG</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard("CONG TY TNHH MTV VANG BAC NGAN LUONG", "account-holder")}
                  >
                    {copiedField === "account-holder" ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Account Number */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Số tài khoản:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">5552223456</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard("5552223456", "account-number")}
                  >
                    {copiedField === "account-number" ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Transfer Note */}
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded">
              <p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium mb-1">📝 Nội dung chuyển khoản:</p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                Vui lòng ghi:{" "}
                <span className="font-mono bg-yellow-100 dark:bg-yellow-900/50 px-1 rounded">
                  Họ tên + Số điện thoại
                </span>
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Ví dụ: <span className="font-mono">Nguyen Van A 0901234567</span>
              </p>
            </div>

            {/* QR Code */}
            <div className="mt-4 flex justify-center">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Image
                  src="/mbbank_qr.jpeg"
                  alt="QR Code thanh toán MB Bank"
                  width={200}
                  height={200}
                  className="rounded"
                />
                <p className="text-xs text-center text-gray-500 mt-2">Quét mã QR để chuyển khoản nhanh</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
