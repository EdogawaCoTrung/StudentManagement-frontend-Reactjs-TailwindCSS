import { httpClient } from "../services"
class SubjectApi {
  async createSubject(data) {
    const res = await httpClient.post("/subjects/add-subject", data)
    return res
  }
  async getAllSubject() {
    const res = await httpClient.get("/subjects")
    return res
  }
  async createScoreByExcel(data) {
    const res = await httpClient.post("/subject-result/import-excel-of-score", data)
    return res
  }
  async getSubjectById(id) {
    const res = await httpClient.get(`/subjects/${id}`)
    return res
  }
  async updateSubject(id, data) {
    const res = await httpClient.put(`/subjects/update/${id}`, data)
    return res
  }
  async deleteSubject(id) {
    const res = await httpClient.put(`/subjects/delete/${id}`)
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
}
const subjectApi = new SubjectApi()
export default subjectApi
