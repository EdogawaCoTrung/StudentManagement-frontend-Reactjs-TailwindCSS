import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import Scanner from "../Scanner"
import { tuitionApi } from "../../../apis"
import { httpClient } from "../../../services"
import { toast } from "react-toastify"
export default function ScannerModal({ isOpenScannerModal, closeScannerModal }) {
  const [scanResult, setScanResult] = useState(false)
  //   useEffect(() => {
  //     const scanner = new Html5QrcodeScanner("reader", {
  //       qrbox: {
  //         width: 500,
  //         height: 500,
  //       },
  //       fps: 5,
  //     })
  //     scanner.render(success, error)
  //     function success(result) {
  //       scanner.clear()
  //       setScanResult(result)
  //     }
  //     function error(error) {
  //       console.warn(error)
  //     }
  //   }, [])
  const payTuition = async () => {
    console.log("LINKTRATIEN", typeof scanResult)
    let res = await httpClient.put(scanResult)
    if (res.EC == 1) {
      toast.error(res.EM)
    } else if (res.EC != 1) {
      toast.success("Thanh toan thanh cong")
    }
  }
  console.log("VAOSCANNER")
  useEffect(() => {
    if (scanResult != false) {
      payTuition()
      closeScannerModal()
    }
  }, [scanResult])
  return (
    <Transition appear show={isOpenScannerModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeScannerModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center align-middle ">
          <div className="">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-hit flex w-fit transform flex-col items-center justify-center rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  QR-CODE
                </Dialog.Title>
                <div className="mt-8 flex flex-row justify-center">
                  <Scanner setScanResult={setScanResult}></Scanner>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
ScannerModal.propTypes = {
  isOpenScannerModal: PropTypes.any,
  closeScannerModal: PropTypes.any,
}
