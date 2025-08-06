"use client"

import { CheckCircle, Clock, Package } from "lucide-react"

interface TransactionStepsProps {
  currentStep: number
}

export function TransactionSteps({ currentStep }: TransactionStepsProps) {
  const steps = [
    { id: 1, name: "Giỏ hàng", icon: Package },
    { id: 2, name: "Xác nhận", icon: Clock },
    { id: 3, name: "Hoàn thành", icon: CheckCircle },
  ]

  return (
    <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = step.id < currentStep
              const isCurrent = step.id === currentStep

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                        ${
                          isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : isCurrent
                              ? "bg-blue-500 border-blue-500 text-white"
                              : "bg-gray-200 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                        }
                      `}
                    >
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span
                      className={`text-xs mt-2 ${isCurrent ? "text-blue-600 font-medium dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${step.id < currentStep ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
