import HistoricCard from "@renderer/components/HistoricCard"

const History = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <h1>History</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <HistoricCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default History
