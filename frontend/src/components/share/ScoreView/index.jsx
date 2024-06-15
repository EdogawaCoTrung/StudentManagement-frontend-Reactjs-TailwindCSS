import { toast } from "react-toastify";
import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { summaryApi } from "../../../apis";
import SubjectSummary from "../../../components/share/SubjectSummary";
import { Avatar } from "@mui/material";
import Overall from "../../../components/share/SubjectSummary/Overall";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ScoreView(idParam) {
  console.log(idParam);
  const isOpenScoreView = idParam.isOpenScoreView;
  const closeScoreView = idParam.closeScoreView;
  const id = idParam.id;
  const grade = idParam.gradename;
  const subjectName = idParam.subjectname;
  const [data, setData] = useState([]);
  let [checkReLoading, setCheckReLoading] = useState(false);
  let [dataTerm1, setDataTerm1] = useState(null);
  console.log("dataTerm1", dataTerm1);
  let [dataTerm2, setDataTerm2] = useState(null);
  let [birthDay, setBirthDay] = useState("");
  let [startDay, setStartDay] = useState("");
  const [tabSelect, setTabSelect] = useState(1);

  const handleListTabClick = (index) => {
    setTabSelect(index);
  };

  function convertDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  console.log("HOCBA", data, typeof data);

  const fetchAllOverallByGrade = async () => {
    console.log("VAOfetchAllOverallByGrade");
    let res = await summaryApi.getSummariesById(id, grade);
    if (res.EC === 1) {
      toast.error(res.EM);
    } else if (res.EC !== 1) {
      let filteredSubjects = [];
      res.DT.subjects.forEach((subject) => {
        if (subject.subjectname.toLowerCase() === subjectName.toLowerCase()) {
          filteredSubjects.push(subject);
        }
      });
      setData(filteredSubjects);
    }
  };

  const fetchAllSummariesByTerm1 = async () => {
    console.log(id);
    let res = await summaryApi.getSummariesByIdAndGrade(id, grade, 1);
    if (res.EC == 1) {
      toast.error(res.EM);
    } else if (res.EC != 1) {
      let filteredData = res.DT.map((student) => {
        let filteredSummaries = student.summaries.map((summary) => {
          let filteredSubjectResults = summary.subjectresults.filter(
            (subjectResult) =>
              subjectResult.subject.subjectname.toLowerCase() === subjectName.toLowerCase()
          );
          return {
            ...summary,
            subjectresults: filteredSubjectResults,
          };
        });
        return {
          ...student,
          summaries: filteredSummaries,
        };
      });
      setDataTerm1(filteredData);
      console.log(dataTerm1);
      let birthDayFormat = convertDate(res.DT[0]?.student.birthDate);
      let startDateFormat = convertDate(res.DT[0]?.student.startDate);
      setBirthDay(birthDayFormat);
      setStartDay(startDateFormat);
    }
  };

  const fetchAllSummariesByTerm2 = async () => {
    let res = await summaryApi.getSummariesByIdAndGrade(id, grade, 2);
    if (res.EC == 1) {
      toast.error(res.EM);
    } else if (res.EC != 1) {
      let filteredData = res.DT.map((student) => {
        let filteredSummaries = student.summaries.map((summary) => {
          let filteredSubjectResults = summary.subjectresults.filter(
            (subjectResult) =>
              subjectResult.subject.subjectname.toLowerCase() === subjectName.toLowerCase()
          );
          return {
            ...summary,
            subjectresults: filteredSubjectResults,
          };
        });
        return {
          ...student,
          summaries: filteredSummaries,
        };
      });
      setDataTerm2(filteredData);
    }
  };

  useEffect(() => {
    fetchAllSummariesByTerm1();
    fetchAllSummariesByTerm2();
    fetchAllOverallByGrade();
  }, [checkReLoading, grade]);

  function SummaryData(data, term) {
    let FilterSummaries = data;
    console.log("CHAYVAOSUMMAY");
    if (FilterSummaries) {
      return FilterSummaries.map((item, index) => (
        <SubjectSummary
          data={[item]}
          listSubjectResult={item.summaries[0].subjectresults}
          key={id}
          id={id}
          term={term}
        ></SubjectSummary>
      ));
    } else {
      return;
    }
  }

  const result1 = SummaryData(dataTerm1, "I");
  const result2 = SummaryData(dataTerm2, "II");

  return (
    <Transition appear show={isOpenScoreView} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeScoreView}>
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

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="flex h-fit w-full flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <p className="animate-fade-down ml-10 mt-6 font-Manrope text-2xl font-bold text-gradeTitle">
                      Điểm số
                    </p>
                  </div>
                </div>
                {dataTerm1 && (
                  <div className="mt-10 flex w-full items-center rounded-lg bg-white shadow-xl">
                    {dataTerm1[0]?.student.User.image != null ? (
                      <img
                        className="m-5 mr-10 h-40 w-40 flex-shrink rounded-full object-cover"
                        src={dataTerm1[0]?.student.User.image}
                      ></img>
                    ) : (
                      <Avatar
                        src="/student.png"
                        alt="Student"
                        sx={{ height: 100, width: 100, marginRight: "12px", border: "solid" }}
                      />
                    )}
                    <div className="flex flex-1 flex-col pr-5">
                      <p className="font-Manrope text-4xl font-bold">{dataTerm1[0]?.student.studentname}</p>
                      <div className="mt-3 flex flex-row items-center justify-between">
                        <div className="mr-2 flex w-full flex-col rounded-lg border-2 p-2">
                          <p className="font-Manrope text-base">
                            <span className="mr-3 font-bold mb-3">Email:</span> {dataTerm1[0]?.student.User.email}
                          </p>
                          <p className="font-Manrope text-base">
                            <span className="mr-3 font-bold mb-3">Lớp:</span>
                            {dataTerm1[0]?.class.classname}
                          </p>
                          <p className="font-Manrope text-base">
                            <span className="mr-3 font-bold mb-3">Khối:</span>
                            {grade}
                          </p>
                          <p className="font-Manrope text-base">
                            <span className="mr-3 font-bold mb-3">Năm:</span>
                            {dataTerm1[0]?.class.grade.year}
                          </p>
                        </div>
                        <div className="flex w-full flex-col rounded-lg border-2 p-2">
                          <p className="font-Manrope text-base">
                            <span className="mr-3 font-bold mb-3">Địa chỉ:</span>
                            {dataTerm1[0]?.student.address}
                          </p>
                          <p className="font-Manrope text-base">
                            <span className="mr-3 font-bold mb-3">Giới tính:</span>
                            {dataTerm1[0]?.student.gender == 1 ? <span>Nam</span> : <span>Nữ</span>}
                          </p>
                          <p className="font-Manrope text-base">
                            <span className="mr-3 font-bold mb-3">Ngày sinh:</span>
                            {birthDay}
                          </p>
                          <p className="font-Manrope text-base">
                            <span className="mr-3 font-bold mb-3">Ngày nhập học:</span>
                            {startDay}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="relative mt-10 flex flex-col">
                  <Tab.Group>
                    <Tab.List className="absolute flex w-full">
                      <Tab
                        autoFocus
                        onClick={() => handleListTabClick(1)}
                        className={
                          tabSelect == 1
                            ? "group z-0 flex h-10 w-fit -translate-y-2 flex-row rounded-none bg-backgroundplus px-3 transition-all duration-300"
                            : "z-0 flex h-10 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300"
                        }
                      >
                        <div className="mt-2 flex flex-row items-center justify-center  align-top">
                          <p
                            className={
                              tabSelect == 1
                                ? "group-text font-Manrope text-base font-semibold text-white duration-0"
                                : "group-text font-Manrope text-base font-semibold duration-0"
                            }
                          >
                            HKI
                          </p>
                        </div>
                      </Tab>
                      <Tab
                        onClick={() => handleListTabClick(2)}
                        className={
                          tabSelect == 2
                            ? "group z-0 flex h-10 w-fit -translate-y-2 flex-row rounded-none bg-backgroundplus px-3 transition-all duration-300"
                            : "z-0 flex h-10 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300"
                        }
                      >
                        <div className="mt-2 flex flex-row items-center justify-center  align-top">
                          <p
                            className={
                              tabSelect == 2
                                ? "group-text font-Manrope text-base font-semibold text-white duration-0"
                                : "group-text font-Manrope text-base font-semibold duration-0"
                            }
                          >
                            HKII
                          </p>
                        </div>
                      </Tab>
                      <Tab
                        onClick={() => handleListTabClick(3)}
                        className={
                          tabSelect == 3
                            ? "group z-0 flex h-10 w-fit -translate-y-2 flex-row rounded-none bg-backgroundplus px-3 transition-all duration-300"
                            : "z-0 flex h-10 w-fit flex-row rounded-none bg-gray-500 px-3 transition-all duration-300"
                        }
                      >
                        <div className="mt-2 flex flex-row items-center justify-center  align-top">
                          <p
                            className={
                              tabSelect == 3
                                ? "group-text font-Manrope text-base font-semibold text-white duration-0"
                                : "group-text font-Manrope text-base font-semibold duration-0"
                            }
                          >
                            Cả năm
                          </p>
                        </div>
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>{result1}</Tab.Panel>
                      <Tab.Panel>{result2}</Tab.Panel>
                      <Tab.Panel>{data && <Overall listSubjectResult={data}></Overall>}</Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
