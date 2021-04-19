/* eslint-disable */
import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:81/api',
    json: true
})

export default {
    async execute(method, resource, data) {
        return client({
            method,
            url: resource,
            data
        }).then(res => {
            return res.data
        }).catch(error => {
            return error.response.data;           
        })        
    },
    
    getUserAll() {
        return this.execute('get', 'users')
    },
    insertUser(body) {
        return this.execute('post', 'users', body)
    },
    updateUser(id, body) {
        return this.execute('put', 'users/' + id, body)
    },
    deleteUser(id) {
        return this.execute('delete', 'users/' + id)
    },

    /**
     * Envio de email
     */
    sendMessage(body){
        return this.execute('post', 'email', body)
    }

}