import { httpClient } from "../services"
class GradeApi {
  async getAllGradeByYearService(year) {
    const res = await httpClient.get(`/grade/find/${year}`)
    return res
  }
  async getAllYear() {
    const res = await httpClient.get("/grade/get-year")
    return res
  }
  async createYear(data) {
    const res = await httpClient.post("/grade/new-year", data)
    return res
  }
  async changeTerm() {
    const res = await httpClient.put("/grade/change-term")
    return res
  }
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
const gradeApi = new GradeApi()
export default gradeApi
