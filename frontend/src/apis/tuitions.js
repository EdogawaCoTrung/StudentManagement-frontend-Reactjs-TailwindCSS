import { httpClient } from "../services"
class TuitionApi {
  async createTuition(data) {
    const res = await httpClient.post("/tuitions/add-tuitions", data)
    return res
  }
  async getAllTuitionByYear(year) {
    const res = await httpClient.get(`/tuitions/in-year/${year}`)
    return res
  }
  async updateTuiTionFee(id) {
    try {
      const res = await httpClient.put(`/tuitions/pay/${id}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async getTuitionById(id) {
    try {
      const res = await httpClient.get(`/tuitions/get-all/${id}`)
      return res
    } catch (error) {
      console.log(error)
    }
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
const tuitionApi = new TuitionApi()
export default tuitionApi
