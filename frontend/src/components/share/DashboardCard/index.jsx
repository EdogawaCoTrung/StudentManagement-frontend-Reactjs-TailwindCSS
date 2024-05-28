import { PiStudent } from "react-icons/pi"
// import PropTypes from "prop-types"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
export default function DashboardCard() {
  const data = [
    {
      number: 6, //HSG
    },
    {
      number: 10, //TOTALHS
    },
  ]
  const colors = ["#e4e8ef", "#475be8"]
  return (
    <div className="mr-3 flex items-center justify-between rounded-xl bg-white p-4">
      <div className="flex flex-col">
        <p className="font-Manrope text-xl font-semibold">Student Grade 10</p>
        <div className="mt-2 flex items-center">
          <PiStudent />
          <p className="font-Manrope font-bold">1000</p>
        </div>
      </div>
      <PieChart width={100} isAnimationActive={true} height={100}>
        <Pie
          data={data}
          cx={50}
          cy={45}
          innerRadius={20}
          fill="#e4e8ef"
          paddingAngle={0}
          dataKey="number"
          startAngle={-270}
          endAngle={150}
          stroke="none"
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={3000}
          animationEasing="ease"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  )
}
