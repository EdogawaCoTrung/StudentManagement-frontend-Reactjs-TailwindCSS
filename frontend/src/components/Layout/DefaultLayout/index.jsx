import SideBar from "../../share/SideBar"
import PropTypes from 'prop-types';


export default function DefaultLayout({ children }) {
  return (
    <div>
      <div className="">
        <div className="flex w-[1150px] max-w-full p-1">
          <SideBar />
          <div className="ml-6 flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
