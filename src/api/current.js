import axios from 'axios';

export default axios.create({
    baseURL: 'https://newsapi.org/v2',
    headers: {
        Authorization: 'Bearer 92e114e52b184b1db05ae56f48d5d193'
    }
});
