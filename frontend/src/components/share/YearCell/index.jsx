import PropTypes from "prop-types"
const YearCell = ({ getValue, row, column, table }) => {
  const BillingDate = getValue()
  //   const { updateData } = table.options.meta
  function convertDate(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    return year
  }
  let getFormattedDate = convertDate(BillingDate)
  console.log("getFormattedDate", getFormattedDate)
  return <p className="font-Manrope">{getFormattedDate}</p>
}
YearCell.propTypes = {
  row: PropTypes.any,
  getValue: PropTypes.any,
  column: PropTypes.any,
  table: PropTypes.any,
}
export default YearCell
