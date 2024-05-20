import PropTypes from "prop-types"
const DateCell = ({ getValue, row, column, table }) => {
  const BillingDate = getValue()
  //   const { updateData } = table.options.meta
  function convertDate(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const formattedDate = `${day}-${month}-${year}`
    return formattedDate
  }
  let getFormattedDate = convertDate(BillingDate)
  return <p className="font-Manrope">{getFormattedDate}</p>
}
DateCell.propTypes = {
  row: PropTypes.any,
  getValue: PropTypes.any,
  column: PropTypes.any,
  table: PropTypes.any,
}
export default DateCell
