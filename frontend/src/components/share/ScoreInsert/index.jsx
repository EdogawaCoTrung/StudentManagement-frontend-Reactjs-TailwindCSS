import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { httpClient } from "../../../services";
import ScoreView from "../ScoreView";

const ScoreInsert = ({ isOpenScoreInsert, closeScoreInsert, id, subjectId, classId, subjectname, gradename }) => {
    const [fifteen1, setFifteen1] = useState(0);
    const [fifteen2, setFifteen2] = useState(0);
    const [fifteen3, setFifteen3] = useState(0);
    const [fifteen4, setFifteen4] = useState(0);
    const [fortyFive1, setFortyFive1] = useState(0);
    const [fortyFive2, setFortyFive2] = useState(0);
    const [finalExam, setFinalExam] = useState(0);
    let [isOpenScoreView, setIsOpenScoreView] = useState(false);

    useEffect(() => {
        console.log("isOpenScoreView updated:", isOpenScoreView);
    }, [isOpenScoreView]);

    function closeScoreView() {
        setIsOpenScoreView(false);
    }

    function handleOpenScoreView() {
        setIsOpenScoreView(true);
        if (isOpenScoreView == true) {
            closeScoreInsert();
        }
    }

    async function handleSave() {
        console.log("save clicked");
        const data = {
            classId: classId,
            studentId: Number(id),
            fifteen_1: Number(fifteen1),
            fifteen_2: Number(fifteen2),
            fifteen_3: Number(fifteen3),
            fifteen_4: Number(fifteen4),
            fourtyFive_1: Number(fortyFive1),
            fourtyFive_2: Number(fortyFive2),
            finalExam: Number(finalExam),
            subjectId: subjectId
        };

        console.log(data);

        try {
            const res = await httpClient.post("/subject-result/input-subject-result", data);
            console.log('Response from server:', res);

            if (res.EC === 0) {
                toast.success("Thêm điểm thành công");
            } else {
                toast.error("Không thể thêm điểm");
            }
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    }

    return (
        <Transition appear show={isOpenScoreInsert} as="div">
            <Dialog as="div" className="relative z-10" onClose={closeScoreInsert}>
                <Transition.Child
                    as="div"
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
                    <div className="flex flex-col">
                        <Transition.Child
                            as="div"
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Nhap diem - ID: {id}
                                </Dialog.Title>
                                <div className="flex items-center p-4">
                                    <div className="flex h-fit w-auto transform flex-col rounded-2xl bg-white p-6 text-left font-Manrope shadow-xl transition-all">
                                        <div className='flex flex-row'>
                                            <TextField label="Fifteen 1" variant="outlined" className="pl-10"
                                                style={{ fontSize: "28px", marginTop: "20px", marginLeft: "4%", width: "100%" }}
                                                value={fifteen1} onChange={(e) => setFifteen1(e.target.value)} />
                                            <TextField label="Fifteen 2" variant="outlined" className="pl-10"
                                                style={{ fontSize: "28px", marginTop: "20px", marginLeft: "4%", width: "100%" }}
                                                value={fifteen2} onChange={(e) => setFifteen2(e.target.value)} />
                                            <TextField label="Fifteen 3" variant="outlined" className="pl-10"
                                                style={{ fontSize: "28px", marginTop: "20px", marginLeft: "4%", width: "100%" }}
                                                value={fifteen3} onChange={(e) => setFifteen3(e.target.value)} />
                                            <TextField label="Fifteen 4" variant="outlined" className="pl-10"
                                                style={{ fontSize: "28px", marginTop: "20px", marginLeft: "4%", width: "100%" }}
                                                value={fifteen4} onChange={(e) => setFifteen4(e.target.value)} />
                                        </div>
                                        <div className="flex flex-row">
                                            <TextField label="Fourty-Five 1" variant="outlined" style={{ fontSize: "28px", marginTop: "20px", marginLeft: "4%", width: "100%" }}
                                                value={fortyFive1} onChange={(e) => setFortyFive1(e.target.value)} />
                                            <TextField label="Fourty-Five 2" variant="outlined" style={{ fontSize: "28px", marginTop: "20px", marginLeft: "4%", width: "100%" }}
                                                value={fortyFive2} onChange={(e) => setFortyFive2(e.target.value)} />
                                        </div>
                                        <TextField label="Final Exam" variant="outlined" style={{ fontSize: "28px", marginTop: "20px", marginLeft: "20%", width: "70%" }}
                                            value={finalExam} onChange={(e) => setFinalExam(e.target.value)} />
                                        <div className="p-4"></div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button variant="contained" color="primary" onClick={handleSave} sx={{ width: "12%" }}>
                                        Lưu điểm
                                    </Button>
                                    <Button variant="outlined" color="primary" onClick={handleOpenScoreView} sx={{ width: "12%", marginLeft: 2, marginRight: 2 }}>
                                        Xem điểm
                                    </Button>
                                    <Button variant="text" color="secondary" onClick={closeScoreInsert} sx={{ marginRight: 4 }}>
                                        Hủy
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
            {isOpenScoreView && (<ScoreView isOpenScoreView={isOpenScoreView} closeScoreView={closeScoreView} id={id} gradename={gradename} subjectname={subjectname} />)}
        </Transition>
    );
};

export default ScoreInsert;
