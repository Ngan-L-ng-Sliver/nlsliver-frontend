"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqData = [
  {
    id: 1,
    question: "Đại lý bạc phú quý đà nẵng có chính thức không?",
    answer:
      "Có, chúng tôi là đại lý bạc phú quý đà nẵng chính thức, chuyên cung cấp bạc phú quý tại đà nẵng với đầy đủ giấy chứng nhận và bảo hành từ thương hiệu Phú Quý.",
  },
  {
    id: 2,
    question: "Bạc phú quý đà nẵng có chất lượng như thế nào?",
    answer:
      "Bạc phú quý đà nẵng tại cửa hàng chúng tôi có độ tinh khiết 999/925, được điêu khắc tinh xảo và có giấy chứng nhận chất lượng uy tín từ thương hiệu Phú Quý.",
  },
  {
    id: 3,
    question: "Chính sách bảo hành bạc phú quý đà nẵng như thế nào?",
    answer:
      "Tất cả sản phẩm bạc phú quý đà nẵng được bảo hành 12 tháng về chất lượng và độ tinh khiết. Hỗ trợ đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất.",
  },
  {
    id: 4,
    question: "Có thể mua bán bạc phú quý cũ tại đà nẵng không?",
    answer:
      "Có, đại lý bạc phú quý đà nẵng chúng tôi nhận mua lại bạc phú quý cũ với giá niêm yết mới nhất. Liên hệ để được tư vấn và định giá chính xác.",
  },
  {
    id: 5,
    question: "Địa chỉ đại lý bạc phú quý đà nẵng ở đâu?",
    answer:
      "Đại lý bạc phú quý đà nẵng chúng tôi tọa lạc tại 45 Bàu Hạc 8, Thanh Khê, Đà Nẵng. Hotline: 0763600889 để được tư vấn và chỉ đường.",
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Câu hỏi thường gặp về Bạc Phú Quý Đà Nẵng
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tìm hiểu thêm về đại lý bạc phú quý đà nẵng và dịch vụ bạc phú quý tại đà nẵng
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 sm:space-y-4">
            {faqData.map((faq) => {
              const isOpen = openItems.includes(faq.id)

              return (
                <Card
                  key={faq.id}
                  className="dark:bg-slate-800 dark:border-slate-700 overflow-hidden transition-all duration-200 hover:shadow-md dark:hover:shadow-slate-700/50 p-0 gap-0"
                >
                  <CardHeader
                    className="cursor-pointer p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    onClick={() => toggleItem(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 dark:text-slate-200 pr-4 flex-1">
                        {faq.question}
                      </CardTitle>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-400 transition-transform duration-200" />
                        ) : (
                          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-400 transition-transform duration-200" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                      <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
