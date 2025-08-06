import type { CartItem } from "@/lib/cart"
import type { UseFormReturn } from "react-hook-form"
import * as yup from "yup"

export const customerInfoSchema = yup.object({
  gender: yup.string().required("Vui lòng chọn danh xưng"),
  name: yup
    .string()
    .required("Họ và tên là bắt buộc")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(50, "Họ và tên không được quá 50 ký tự"),
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
  email: yup.string().email("Email không hợp lệ").nullable(),
  birthDate: yup.string().nullable(),
  deliveryMethod: yup.string().required("Vui lòng chọn hình thức nhận hàng"),
  province: yup.string().when("deliveryMethod", {
    is: "delivery",
    then: (schema) => schema.required("Vui lòng chọn Tỉnh/Thành phố"),
    otherwise: (schema) => schema.nullable(),
  }),
  district: yup.string().when("deliveryMethod", {
    is: "delivery",
    then: (schema) => schema.required("Vui lòng chọn Quận/Huyện"),
    otherwise: (schema) => schema.nullable(),
  }),
  ward: yup.string().when("deliveryMethod", {
    is: "delivery",
    then: (schema) => schema.required("Vui lòng chọn Phường/Xã"),
    otherwise: (schema) => schema.nullable(),
  }),
  address: yup.string().when("deliveryMethod", {
    is: "delivery",
    then: (schema) =>
      schema
        .required("Địa chỉ giao hàng là bắt buộc")
        .min(10, "Địa chỉ phải có ít nhất 10 ký tự")
        .max(200, "Địa chỉ không được quá 200 ký tự"),
    otherwise: (schema) => schema.nullable(),
  }),
  store: yup.string().when("deliveryMethod", {
    is: "pickup",
    then: (schema) => schema.required("Vui lòng chọn cửa hàng"),
    otherwise: (schema) => schema.nullable(),
  }),
  paymentMethod: yup.string().required("Vui lòng chọn phương thức thanh toán"),
  note: yup.string().max(500, "Ghi chú không được quá 500 ký tự").nullable(),
  agreeTerms: yup.boolean().oneOf([true], "Vui lòng đồng ý với điều khoản"),
  agreePromotion: yup.boolean().nullable(),
  agreeCompany: yup.boolean().nullable(),
})

export type CustomerInfoFormType = yup.InferType<typeof customerInfoSchema>

export interface CartItemsProps {
  cartItems: CartItem[]
  onQuantityChange: (productId: number, newQuantity: number) => void
  onRemoveItem: (productId: number) => void
  onClearCart: () => void
}

export interface CouponSectionProps {
  couponCode: string
  setCouponCode: (code: string) => void
  onApplyCoupon: () => void
}

export interface OrderSummaryProps {
  subtotal: number
  shippingFee: number
  discount: number
  total: number
}

export interface CustomerInfoFormProps {
  form: UseFormReturn<CustomerInfoFormType>
}

export interface DeliveryMethodProps {
  form: UseFormReturn<CustomerInfoFormType>
}

export interface PaymentMethodProps {
  form: UseFormReturn<CustomerInfoFormType>
}

export interface OrderNotesProps {
  form: UseFormReturn<CustomerInfoFormType>
}
