import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MultiSelectProps {
  options: string[]
  selectedValues: string[]
  onSelectionChange: (value: string, checked: boolean) => void
  placeholder: string
}

export function MultiSelect({ options, selectedValues, onSelectionChange, placeholder }: MultiSelectProps) {
  const displayText =
    selectedValues.length === 0
      ? "Tất cả"
      : selectedValues.length === 1
        ? selectedValues[0]
        : `${selectedValues.length} lựa chọn`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between h-9 sm:h-10 text-xs sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 bg-transparent"
        >
          <span className="truncate">{displayText}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 dark:bg-slate-700 dark:border-slate-600" align="start">
        <div className="p-2 space-y-2 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${placeholder}-${option}`}
                checked={selectedValues.includes(option)}
                onCheckedChange={(checked) => onSelectionChange(option, checked as boolean)}
                className="dark:border-slate-500"
              />
              <label
                htmlFor={`${placeholder}-${option}`}
                className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 cursor-pointer flex-1"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
