import RevenueChart from "../Dashboard/components/RevenueChart/RevenueChart"

const Payments = () => {
  return (
     <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div >
        <h1 className="text-xl md:text-2xl lg:text-[32px] font-bold">Payments</h1>
      </div>
      <RevenueChart />
    </div>
  )
}

export default Payments