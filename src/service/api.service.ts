import axios from "axios";

const apis = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/'
})
export default apis;