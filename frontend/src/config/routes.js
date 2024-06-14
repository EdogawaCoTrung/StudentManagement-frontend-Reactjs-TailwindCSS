export const routes = {
  //ADMINISTRATOR
  Dashboard: "/",
  Class: "/class",
  SummariesById: "/list-summaries/:classId",
  Summaries: "/summaries",
  StudentSummariesById: "/summaries/my-transcript/:id",
  Login: "/login",
  Tuition: "/tuition",
  Student: "/student",
  Teacher: "/teacher",
  Regulations: "/regulations",
  AdministratorProfile: "/administratorProfile",
  Subject: "/subject",
  Assignment: "/assignment",
  //STUDENT
  StudentDashboard: "/studentDashboard",
  StudentClass: "/studentClass",
  StudentSummaries: "/studentSummaries",
  StudentTuition: "/studentTuition",
  StudentProfile: "/studentProfile",
  //OFFICER
  OfficerTuition: "/officerTuition",
  OfficerProfile: "/officerProfile",
  OfficerDiscipline: "/officerDiscipline",
  OfficerStudentDiscipline: "/officerStudentDiscipline/:id",
  //TEACHER
  TeacherClass: "/teacherclass",
  TeacherProfile: "/teacherProfile",
}
