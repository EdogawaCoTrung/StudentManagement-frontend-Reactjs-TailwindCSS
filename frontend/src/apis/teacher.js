import { httpClient } from "../services"
class TeacherApi {
  async getAllTeacherBySubjectId(id) {
    const res = await httpClient.get(`/teacher/subject/${id}`)
    return res
  }
  async getAllTeacher() {
    const res = await httpClient.get("/teacher")
    return res
  }
  async createTeacher(data) {
    const res = await httpClient.post("/teacher/create-teacher", data)
    return res
  }
  async getTeacherById(id) {
    const res = await httpClient.get(`/teacher/${id}`)
    console.log(res)
    return res
  }
  async deleteTeacher(id) {
    const res = await httpClient.put(`/teacher/delete-teacher/${id}`);
    return res;
  }
  async updateTeacher(id, data) {
    const res = await httpClient.put(`/teacher/update-teacher/${id}`, data);
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
const teacherApi = new TeacherApi()
export default teacherApi
