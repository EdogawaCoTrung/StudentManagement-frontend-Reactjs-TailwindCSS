import React, { PureComponent } from "react"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import PropTypes from "prop-types"
export default function BarchartCompareGpaClass({ compareClass }) {
  console.log("CHAYCHART")
  return (
    <div className="flex flex-col rounded-xl bg-white shadow-xl">
      <div>
        <p className="p-4 text-center font-Manrope text-xl font-semibold text-black">Compare subject scores in class</p>
      </div>
      <BarChart
        width={700}
        height={350}
        data={compareClass}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
        barSize={30}
      >
        <XAxis dataKey="subjectname" axisLine={false} padding={{ left: 10 }} />
        <YAxis axisLine={false} tickLine={false} padding={{ bottom: 10, top: 10 }} domain={[0, 10]} />
        <Tooltip cursor={{ fill: "transparent" }} />
        <Legend iconType="circle" iconSize={10} verticalAlign="top" align="center" height={50} />
        <Bar
          fill="#4a7746"
          activeBar={false}
          isAnimationActive={true}
          barSize={24}
          radius={[4, 4, 4, 4]}
          dataKey="studentAverageScore"
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease"
        />
        <Bar
          fill="#5D7B6F"
          activeBar={false}
          isAnimationActive={true}
          barSize={24}
          radius={[4, 4, 4, 4]}
          dataKey="classAverageScore"
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease"
        />
      </BarChart>
    </div>
  )
}
BarchartCompareGpaClass.propTypes = {
  compareClass: PropTypes.any,
  // columnFilters: PropTypes.any,
}
