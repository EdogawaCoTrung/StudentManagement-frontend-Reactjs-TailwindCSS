import { httpClient } from "../services"
class SummaryApi {
  async createSummaries(id, data) {
    const res = await httpClient.post(`/summaries/add-student/${id}`, data)
    return res
  }
  async getSummariesById(id, gradename) {
    const res = await httpClient.get(`/summaries/all-year/${id}/${gradename}`)
    return res
  }
  async getSummariesByIdAndGrade(id, gradename, term) {
    const res = await httpClient.get(`/summaries/${id}/${gradename}/${term}`)
    return res
  }
  async getDiscipineById(id) {
    const res = await httpClient.get(`/detail-summary/${id}`)
    return res
  }
  async getAllDiscipine() {
    const res = await httpClient.get("/detail-summary/all-fringes")
    return res
  }
  async createDisciplines(data) {
    const res = await httpClient.post("/detail-summary/create-new-detail-summary", data)
    return res
  }
  async deleteDisciplines(id) {
    const res = await httpClient.delete(`/detail-summary/delete-details-summary/${id}`)
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
const summaryApi = new SummaryApi()
export default summaryApi
