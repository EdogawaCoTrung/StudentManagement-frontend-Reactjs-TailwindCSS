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
  async createStudent(data) {
    console.log("api called")
    const res = await httpClient.post(`/student/create-student`, data)
    return res
  }
  async updateStudent(id, data) {
    const res = await httpClient.put(`/student/update-student/${id}`, data)
    return res
  }
  async getStudentById(id) {
    const res = await httpClient.get(`/student/${id}`)
    console.log(res)
    return res
  }
  async getStudentInYear() {
    const res = await httpClient.get("/detail-summary/students")
    console.log(res)
    return res
  }
  //   async createClass(data) {
  //     const res = await httpClient.post("/class/create-class", data)
  //     return res
  //   }
  //   async getAllStudentByClassId(id) {
  //     const res = await httpClient.get(`/class/get-student/${id}`)
  //     return res
  //   }
  //   async getAllUnapprovedGroup() {
  //     const res = await httpClient.get("/groups/unapproved")
  //     return res
  //   }
  //   async getAllApprovedGroup() {
  //     const res = await httpClient.get("/groups/approved")
  //     return res
  //   }
  //   async getGroupById(id) {
  //     try {
  //       const res = await httpClient.get(`/groups/${id}`)
  //       return res
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   async getAllMember(id) {
  //     try {
  //       const res = await httpClient.get(`/groups/${id}/members`)
  //       return res
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   async updateOwner(currentGroupId, newOwnerId) {
  //     try {
  //       const res = await httpClient.patch(`/groups/${currentGroupId}/change-owner`, {
  //         newOwnerId: newOwnerId,
  //       })
  //       return res
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   async approveGroup(groupId) {
  //     try {
  //       const res = await httpClient.patch(`/groups/${groupId}/approve`)
  //       return res
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   async deleteGroup(groupId) {
  //     try {
  //       const res = await httpClient.delete(`/groups/${groupId}`)
  //       return res
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  async deleteStudent(id) {
    try {
      const res = await httpClient.put(`/student/delete-student/${id}`)
      console.log(res)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async deleteStudentFromClass(studentId, classId) {
    try {
      const res = await httpClient.delete(`/summaries/delete-summaries/${studentId}/${classId}`)
      console.log(res)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}
const studentApi = new StudentApi()
export default studentApi
