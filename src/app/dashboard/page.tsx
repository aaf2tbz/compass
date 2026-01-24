import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

import data from "./data.json"

export default function Page() {
  return (
    <div className="flex flex-col gap-3 py-2 md:gap-4 md:py-3">
      <SectionCards />
      <div className="px-3 lg:px-4">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  )
}
