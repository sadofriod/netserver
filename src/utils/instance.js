import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    timeout: 6000,
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'http://59.110.13.76:8088'
            : 'http://10.10.10.172:8088', //设置默认api路径
    headers: { 'X-Custom-Header': 'foobar' }
})

export default instance