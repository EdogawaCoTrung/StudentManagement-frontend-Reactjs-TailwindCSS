import "./index.scss"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
const totalStudent = 4000
const data = [
  {
    name: "HSG",
    percentValues: 1500,
  },
  {
    name: "HSK",
    percentValues: 2000,
  },
  {
    name: "HSTB",
    percentValues: 500,
  },
  {
    name: "HSY",
    percentValues: 100,
  },
]

const AreaProgressChart = () => {
  return (
    <div className="ml-5 flex w-full flex-col rounded-xl bg-white pl-5">
      <div>
        <p className="p-4 font-Manrope text-base font-semibold text-black">Student Type</p>
      </div>
      <BarChart
        width={400}
        height={300}
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <XAxis type="number" axisLine={false} domain={[0, totalStudent]} />
        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: "transparent" }} />
        {/* <Legend iconType="circle" iconSize={10} verticalAlign="top" align="right" /> */}
        <Bar
          fill="#4a7746"
          activeBar={false}
          isAnimationActive={true}
          barSize={20}
          radius={[4, 4, 4, 4]}
          dataKey="percentValues"
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </div>
  )
}

export default AreaProgressChart
