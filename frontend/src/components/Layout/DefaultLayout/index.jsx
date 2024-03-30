import Sidebar from "../../share/Sidebar"
export default function DefaultLayout({ children }) {
  return (
    <div>
      <div className="">
        <div className="flex w-[1150px] max-w-full p-1">
          <Sidebar />
          <div className="ml-6 flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}