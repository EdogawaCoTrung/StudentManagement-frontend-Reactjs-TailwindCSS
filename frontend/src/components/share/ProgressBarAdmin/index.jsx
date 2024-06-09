import "./index.scss"
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { studentApi } from "../../../apis"
const AreaProgressChart = ({ numberByTitle }) => {
  let totalStudent = 1
  const getTotalStudent = async () => {
    let res = studentApi.getAllStudent()
    totalStudent = res.DT.length()
  }
  useEffect(() => {
    getTotalStudent()
  }, [])
  return (
    <div className="ml-5 flex w-full flex-col rounded-xl bg-white pl-5 shadow-xl">
      <div>
        <p className="p-4 text-center font-Manrope text-xl font-semibold text-black">Student Type</p>
      </div>
      <BarChart
        width={400}
        height={300}
        data={numberByTitle}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <XAxis type="number" axisLine={false} domain={[0, totalStudent]} />
        <YAxis type="category" dataKey="title" axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: "transparent" }} />
        {/* <Legend iconType="circle" iconSize={10} verticalAlign="top" align="right" /> */}
        <Bar
          fill="#4a7746"
          activeBar={false}
          isAnimationActive={true}
          barSize={20}
          radius={[4, 4, 4, 4]}
          dataKey="NumberHS"
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease"
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </div>
  )
}
AreaProgressChart.propTypes = {
  numberByTitle: PropTypes.any,
  // columnFilters: PropTypes.any,
}
export default AreaProgressChart
