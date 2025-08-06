import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { OrderData } from "./orders"

export interface CustomerInfo {
  fullName: string
  phoneNumber: string
  email: string
  address: string | any
  notes: string
}

function removeVietnameseTones(str: string): string {
  if (!str || typeof str !== "string") return ""

  try {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
  } catch (error) {
    console.warn("Error removing Vietnamese tones:", error)
    return str
  }
}

function safeText(text: any): string {
  if (text === null || text === undefined) return ""
  return String(text).trim()
}

function formatAddress(address: any): string {
  if (!address) return ""

  if (typeof address === "string") {
    return address
  }

  if (typeof address === "object") {
    const parts = [
      safeText(address.address),
      safeText(address.ward),
      safeText(address.district),
      safeText(address.province),
    ].filter((part) => part !== "")
    return parts.join(", ")
  }

  return String(address)
}

function parsePrice(price: any): number {
  if (typeof price === "number") return price
  if (typeof price === "string") {
    const numericPrice = price.replace(/[^\d]/g, "")
    return Number.parseInt(numericPrice) || 0
  }
  return 0
}

export function generateOrderPDF(order: OrderData, customerInfo?: CustomerInfo): string {
  try {
    const doc = new jsPDF()
    doc.setFont("helvetica", "normal")

    // Header
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("NGAN LUONG SILVER", 105, 20, { align: "center" })

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Chuyen kinh doanh trang suc bac cao cap", 105, 28, { align: "center" })
    doc.text("Dia chi: 45 Bau Hac 8, Thanh Khe, Da Nang", 105, 35, { align: "center" })
    doc.text("Dien thoai: 0763 600 889 | Email: nganluongsilver@gmail.com", 105, 42, { align: "center" })

    doc.setLineWidth(0.5)
    doc.line(20, 48, 190, 48)

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("HOA DON BAN HANG", 105, 58, { align: "center" })

    // Order Info
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Ma don hang: ${safeText(order.id)}`, 20, 70)

    const orderDate = order.createdAt
      ? new Date(order.createdAt).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : new Date().toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
    doc.text(`Ngay tao: ${orderDate}`, 20, 77)

    // Customer Info
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.text("THONG TIN KHACH HANG", 20, 90)

    const finalCustomerInfo = customerInfo || order.customerInfo
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    doc.text(`Ho ten: ${removeVietnameseTones(safeText(finalCustomerInfo.fullName))}`, 20, 98)
    doc.text(`Dien thoai: ${safeText(finalCustomerInfo.phoneNumber)}`, 20, 105)
    doc.text(`Email: ${safeText(finalCustomerInfo.email)}`, 20, 112)

    let currentY = 112

    // Nếu là giao hàng thì show địa chỉ ở đây
    if (order.deliveryMethod !== "pickup") {
      const address = formatAddress(finalCustomerInfo.address)
      currentY += 7
      doc.text(`Dia chi giao hang: ${removeVietnameseTones(address)}`, 20, currentY)
    }

    // Ghi chú khách hàng
    const customerNotes = safeText(finalCustomerInfo.notes)
    if (customerNotes) {
      currentY += 7
      doc.text(`Ghi chu khach hang: ${removeVietnameseTones(customerNotes)}`, 20, currentY)
    }

    // Items Header
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.text("CHI TIET DON HANG", 20, currentY + 16)

    // Table Data
    const tableData = order.items.map((item, index) => {
      try {
        const itemPrice = parsePrice(item.sellPrice)
        const itemTotal = itemPrice * (item.quantity || 1)

        return [
          String(index + 1),
          removeVietnameseTones(safeText(item.name)),
          safeText(item.code),
          String(item.quantity || 1),
          itemPrice.toLocaleString("vi-VN") + " VND",
          itemTotal.toLocaleString("vi-VN") + " VND",
        ]
      } catch (error) {
        return [String(index + 1), "Loi san pham", "", "1", "0 VND", "0 VND"]
      }
    })

    autoTable(doc, {
      startY: currentY + 23,
      head: [["STT", "Ten san pham", "Ma SP", "SL", "Don gia", "Thanh tien"]],
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 9,
        cellPadding: 3,
        font: "helvetica",
        overflow: "linebreak",
        cellWidth: "wrap",
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        valign: "top",
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250],
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 12 },
        1: { halign: "left", cellWidth: 61 },
        2: { halign: "center", cellWidth: 20 },
        3: { halign: "center", cellWidth: 12 },
        4: { halign: "right", cellWidth: 32 },
        5: { halign: "right", cellWidth: 32 },
      },
      margin: { left: 20, right: 20 },
    })

    const finalY = (doc as any).lastAutoTable?.finalY || 200
    let yPos = finalY + 15
    doc.setFontSize(10)

    const subtotal = order.subtotal || 0
    const shippingFee = order.shippingFee || 0
    const discount = order.discount || 0
    const total = order.total || 0

    doc.text("Tam tinh:", 120, yPos)
    doc.text(subtotal.toLocaleString("vi-VN") + " VND", 185, yPos, { align: "right" })

    yPos += 7
    doc.text("Phi van chuyen:", 120, yPos)
    // doc.text(shippingFee.toLocaleString("vi-VN") + " VND", 185, yPos, { align: "right" })
    doc.text("Thuong luong", 185, yPos, { align: "right" })

    if (discount > 0) {
      yPos += 7
      doc.text("Giam gia:", 120, yPos)
      doc.text("-" + discount.toLocaleString("vi-VN") + " VND", 185, yPos, { align: "right" })
    }

    yPos += 10
    doc.setFillColor(230, 230, 230)
    doc.rect(120, yPos - 5, 70, 10, "F")
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.text("TONG CONG:", 122, yPos)
    doc.text(total.toLocaleString("vi-VN") + " VND", 188, yPos, { align: "right" })

    // Payment & Delivery Method
    yPos += 20
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    const paymentText = order.paymentMethod === "bank" ? "Chuyen khoan ngan hang" : "Thanh toan khi nhan hang"
    doc.text(`Phuong thuc thanh toan: ${paymentText}`, 20, yPos)

    yPos += 7
    const deliveryText = order.deliveryMethod === "delivery" ? "Giao hang tan noi" : "Nhan tai cua hang"
    doc.text(`Phuong thuc giao hang: ${deliveryText}`, 20, yPos)

    // Dia chi cua hang (neu pickup)
    if (order.deliveryMethod === "pickup") {
      yPos += 7
      const storeAddress = order.storeAddress
        ? removeVietnameseTones(safeText(order.storeAddress).replace(/\s*\n\s*/g, " "))
        : "Chua chon cua hang"
      doc.text(`Dia chi cua hang den nhan: ${storeAddress}`, 20, yPos)
    }

    // Ghi chu don hang (neu khac voi ghi chu khach hang)
    const orderNotes = safeText(order.notes)
    if (orderNotes && orderNotes !== customerNotes) {
      yPos += 7
      doc.text(`Ghi chu don hang: ${removeVietnameseTones(orderNotes)}`, 20, yPos)
    }

    // Bank transfer info
    if (order.paymentMethod === "bank") {
      yPos += 15
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text("THONG TIN CHUYEN KHOAN", 20, yPos)

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      yPos += 8
      doc.text("Ngan hang: MB Bank (Quan Doi)", 20, yPos)
      yPos += 7
      doc.text("So tai khoan: 5552223456", 20, yPos)
      yPos += 7
      doc.text("Chu tai khoan: CONG TY TNHH MTV VANG BAC NGAN LUONG", 20, yPos)
      yPos += 7
      doc.text(`Noi dung: ${safeText(order.id)}`, 20, yPos)
    }

    // Footer
    yPos += 20
    doc.setFontSize(9)
    doc.setFont("helvetica", "italic")
    doc.text("Cam on quy khach da tin tuong va su dung san pham cua chung toi!", 105, yPos, { align: "center" })
    yPos += 7
    doc.text("Moi thac mac xin lien he: 0763 600 889", 105, yPos, { align: "center" })

    return doc.output("datauristring")
  } catch (error) {
    console.error("PDF generation error:", error)
    try {
      const doc = new jsPDF()
      doc.setFont("helvetica", "normal")
      doc.setFontSize(16)
      doc.text("HOA DON BAN HANG", 105, 30, { align: "center" })
      doc.setFontSize(12)
      doc.text(`Ma don hang: ${safeText(order.id)}`, 20, 50)
      doc.text("Co loi xay ra khi tao PDF chi tiet.", 20, 70)
      doc.text("Vui long lien he: 0763 600 889", 20, 90)
      return doc.output("datauristring")
    } catch (fallbackError) {
      console.error("Fallback PDF generation also failed:", fallbackError)
      throw new Error("Khong the tao PDF. Vui long thu lai!")
    }
  }
}
