import { httpClient } from "../services"
class StudentApi {
  async getAllStudent() {
    const res = await httpClient.get("/student")
    return res
  }
  async getAllStudentNotInClass(id) {
    const res = await httpClient.get(`/student/student-without-class/${id}`)
    return res
  }
  async getAllClassByStudentId(id) {
    const res = await httpClient.get(`/student/get-class/${id}`)
    return res
  }
  async deleteStudent(id) {
    try {
      const res = await httpClient.delete(`/student/delete-student/${id}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}
const studentApi = new StudentApi()
export default studentApi
