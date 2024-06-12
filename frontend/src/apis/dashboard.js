import { httpClient } from "../services"
class DashboardApi {
  async getBestStudentInEachGrade(year) {
    const res = await httpClient.get(`/statistics/best-students/${year}`)
    return res
  }
  async getExcellentStudent(year) {
    const res = await httpClient.get(`/statistics/count-excellent-students/${year}`)
    return res
  }
  async getCompare3year(year) {
    const res = await httpClient.get(`/statistics/compare-three-year/${year}`)
    return res
  }
  async getTop10Students(year) {
    const res = await httpClient.get(`/statistics/top-ten-students/${year}`)
    return res
  }
  async getNumberOfStudentsWithType(year) {
    const res = await httpClient.get(`/statistics/number-of-student-by-title/${year}`)
    return res
  }
  async getGpaOfOneStudent(id) {
    const res = await httpClient.get(`/statistics/compare-gpa/${id}`)
    return res
  }
  async getCompareGpaOfClass(id, term, year) {
    const res = await httpClient.get(`/statistics/compare-gpa-student-to-class/${id}/${term}/${year}`)
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
const dashboardApi = new DashboardApi()
export default dashboardApi
