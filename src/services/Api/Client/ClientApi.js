import axiosClient from "../../../api/axios";

const ClientApi = {
    getCsrfToken : async () => {
        return await axiosClient.get('sanctum/csrf-cookie')
    },
    login : async (email,password) => {
        
        return await axiosClient.post('/login',{email,password})
    },
    logout : async () => {
        return await axiosClient.post('/logout',null,{
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
    },
    client : async () => {
        return await axiosClient.get('/api/user')
    },
    getPermisTypes : async () => {
        return await axiosClient.get('/permistypes');
    },
    addNewClient : async (client) => {
        return await axiosClient.post('/clients',client, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
    isEmailExist : async (email) => {
        return await axiosClient.get(`clients/check-email?email=${email}`);
    },
    isCinExist : async (cin) => {
        return await axiosClient.get(`clients/check-cin?cin=${cin}`);
    }
}
export default ClientApi;