import { Button } from "@mui/material"
import PropTypes from "prop-types"
import QrCodeIcon from "@mui/icons-material/QrCode"
import { useState } from "react"
import QrCodeModal from "../QrCodeModal"
const Scanner = ({ getValue, row, column, table }) => {
  let [isOpenScannerModal, setIsOpenScannerModal] = useState(false)
  function closeScannerModal() {
    setIsOpenScannerModal(false)
  }
  function openScannerModal() {
    setIsOpenScannerModal(true)
  }
  const id = getValue()
  //   const { updateData } = table.options.meta
  function convertLink(id) {
    return `/tuitions/pay/${id}`
  }
  let getLink = convertLink(id)
  return (
    <div>
      <Button onClick={openScannerModal} variant="contained" color="info" startIcon={<QrCodeIcon></QrCodeIcon>}>
        QR
      </Button>
      <QrCodeModal
        closeScannerModal={closeScannerModal}
        isOpenScannerModal={isOpenScannerModal}
        link={getLink}
      ></QrCodeModal>
    </div>
  )
}
Scanner.propTypes = {
  row: PropTypes.any,
  getValue: PropTypes.any,
  column: PropTypes.any,
  table: PropTypes.any,
}
export default Scanner
