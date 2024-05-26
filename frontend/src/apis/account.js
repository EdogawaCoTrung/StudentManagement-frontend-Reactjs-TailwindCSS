import { httpClient } from "../services"
import { jwtDecode } from 'jwt-decode';


class AccountApi {
    async getPasswordById(id) {
        const res = await httpClient.get(`/account/${id}`)
        return res.password;
    }
}

const accountApi = new AccountApi();
export default accountApi;