import { httpClient } from "../services"
class ClassApi {
  async getAllClassByGradeAndYear(gradename, year) {
    const res = await httpClient.get(`/class/get-grade/${gradename}/${year}`)
    return res
  }
  async getAllClass() {
    const res = await httpClient.get("/class")
    return res
  }
  async createClass(data) {
    const res = await httpClient.post("/class/create-class", data)
    return res
  }
  async getAllStudentByClassId(id) {
    const res = await httpClient.get(`/class/summaries/${id}`)
    return res
  }
  async getAllSummariesByClassId(id) {
    const res = await httpClient.get(`/class/summaries/${id}`)
    return res
  }
  async getAllClassesByTeacherId(id) {
    const res = await httpClient.get(`/class/teacher/${id}`)
    console.log(res)
    return res
  }
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
const classApi = new ClassApi()
export default classApi
