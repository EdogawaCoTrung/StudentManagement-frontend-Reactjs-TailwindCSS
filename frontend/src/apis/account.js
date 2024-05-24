import { httpClient } from "../services"

class AccountApi {
    async getPasswordById(id) {
        const res = await httpClient.get(`/account/${id}`)
        console.log(res)
        let password = res.data.password;
        console.log(password)
        return password;
    }
}

const accountApi = new AccountApi();
export default accountApi;