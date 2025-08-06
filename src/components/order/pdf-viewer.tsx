"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Loader2 } from "lucide-react"
import { generateOrderPDF } from "@/lib/pdf-generator"
import type { OrderData } from "@/lib/orders"

interface PDFViewerProps {
  order: OrderData
  customerInfo?: {
    fullName: string
    phoneNumber: string
    email: string
    address: string
    notes: string
  }
}

export function PDFViewer({ order, customerInfo }: PDFViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string>("")

  const generatePDF = async () => {
    try {
      setIsGenerating(true)
      setError("")

      const pdfDataUri = generateOrderPDF(order, customerInfo)
      setPdfUrl(pdfDataUri)
    } catch (err) {
      console.error("PDF generation failed:", err)
      setError("Không thể tạo PDF. Vui lòng thử lại!")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = `hoa-don-${order.id}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  useEffect(() => {
    generatePDF()
  }, [order, customerInfo])

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={generatePDF} variant="outline">
              Thử lại
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isGenerating) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500 mb-4" />
            <p className="text-gray-600">Đang tạo hóa đơn PDF...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Hóa đơn PDF
          </h3>
          <Button onClick={downloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Tải xuống
          </Button>
        </div>

        {pdfUrl && (
          <div className="border rounded-lg overflow-hidden">
            <iframe src={pdfUrl} className="w-full h-[600px]" title="Hóa đơn PDF" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
