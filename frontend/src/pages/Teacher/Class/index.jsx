import { useEffect, useState } from "react";
import { httpClient } from "../../../services";
import CardClass from "../../../components/share/CardClass";
import Box from "@mui/material/Box";
import DialogView from "../../../components/share/TeacherModal";
import Dropdown from "../../../components/share/Dropdown";

export default function TeacherClass() {
    let [isOpen, setIsOpen] = useState(false);
    let [selectYear, setSelectYear] = useState("");
    let [isOpen2, setIsOpen2] = useState(false);
    let [isOpen3, setIsOpen3] = useState(false);
    const [classValue, setClassValue] = useState([]);
    const [subject, setSubject] = useState("");
    const [grade10, setGrade10] = useState([]);  // Initialize as array
    const [grade11, setGrade11] = useState([]);  // Initialize as array
    const [grade12, setGrade12] = useState([]);  // Initialize as array
    const id = localStorage.getItem("teacherId");
    let [checkId, setCheckId] = useState();
    const [subjectId, setSubjectId] = useState(0);


    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal2() {
        setIsOpen2(false);
    }

    function openModal2() {
        setIsOpen2(true);
    }

    function closeModal3() {
        setIsOpen3(false);
    }

    function openModal3() {
        setIsOpen3(true);
    }
    async function getSubjectName() {
      const res = await httpClient.get(`/teacher/${id}`)
      setSubject(res.DT.subject.subjectname);
    }

    async function getSubjectId() {

    console.log("GET SUBJECT!!!!!!!!1!!!!!!!!!!")
      const res2 = await httpClient.get("/subjects/");
    res2.DT.forEach((subjectValue) => {
        console.log(subjectValue.subjectname)
        if (subjectValue.subjectname == subject) {
            setSubjectId(subjectValue.id)
        }
    });
        console.log(subjectId)
    }

    async function getClass() {
        const res = await httpClient.get(`/class/teacher/${id}`);
        setClassValue(res.DT);
    }

    useEffect(() => {
        if (id) {
            getClass();
            getSubjectName();
        }
    }, [id]);

    useEffect(() => {
        if (subject !== null) {
            getSubjectId();
        }
    }, [subject])

    useEffect(() => {

        // Process the classValue to separate grades
        const grade10Classes = [];
        const grade11Classes = [];
        const grade12Classes = [];

        classValue.forEach(({ id, classname, gradeId }) => {
            if (gradeId === 1) {
                grade10Classes.push({ id, classname });
            } else if (gradeId === 2) {
                grade11Classes.push({ id, classname });
            } else if (gradeId === 3) {
                grade12Classes.push({ id, classname });
            }
        });

        setGrade10(grade10Classes);
        setGrade11(grade11Classes);
        setGrade12(grade12Classes);
    }, [classValue]);

    return (
        <div>
            <Box className="z-0 mx-14 mt-10 flex flex-col justify-center" sx={{ flexGrow: 1 }}>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                        <div className="flex animate-fade-right items-center justify-center rounded-full bg-gradeTitle2 px-7 py-2 text-center align-middle shadow-md animate-duration-[625ms]">
                            <p className="text-center text-base font-semibold text-white">Khối 10</p>
                        </div>
                    </div>
                    <Dropdown selectYear={selectYear} setSelectYear={setSelectYear}></Dropdown>
                </div>
                <div className="flex flex-row flex-wrap">
                    {grade10.map(({ id, classname }) => (
                        <div key={id}>
                            <CardClass
                                checkId={id}
                                setCheckId={setCheckId}
                                openModal={openModal}
                                nameclass={classname}
                            />
                            {checkId === id && (
                                <DialogView
                                  classId={id}
                                  isOpen={isOpen}
                                  closeModal={closeModal}
                                  nameclass={classname}
                                  gradename={10}
                                  subjectname={subject} 
                                  subjectId={subjectId}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-row items-center">
                    <div className="flex animate-fade-right items-center justify-center rounded-full bg-gradeTitle2 px-7 py-2 text-center align-middle shadow-md animate-duration-[625ms]">
                        <p className="text-center text-base font-semibold text-white">Khối 11</p>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap">
                    {grade11.map(({ id, classname }) => (
                        <div key={id}>
                            <CardClass
                                checkId={id}
                                setCheckId={setCheckId}
                                openModal={openModal2}
                                nameclass={classname}
                            />
                            {checkId === id && (
                                <DialogView
                                    classId={id}
                                    isOpen={isOpen2}
                                    closeModal={closeModal2}
                                    nameclass={classname}
                                    gradename={11}
                                    subjectname={subject}  // Replace with the actual role if needed
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-row items-center">
                    <div className="flex animate-fade-right items-center justify-center rounded-full bg-gradeTitle2 px-7 py-2 text-center align-middle shadow-md animate-duration-[625ms]">
                        <p className="text-center text-base font-semibold text-white">Khối 12</p>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap">
                    {grade12.map(({ id, classname }) => (
                        <div key={id}>
                            <CardClass
                                checkId={id}
                                setCheckId={setCheckId}
                                openModal={openModal3}
                                nameclass={classname}
                            />
                            {checkId === id && (
                                <DialogView
                                    classId={id}
                                    isOpen={isOpen3}
                                    closeModal={closeModal3}
                                    nameclass={classname}
                                    gradename={12}
                                    subjectname={subject}   // Replace with the actual role if needed
                                />
                            )}
                        </div>
                    ))}
                </div>
            </Box>
        </div>
    );
}
