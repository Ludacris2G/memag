import axios from 'axios';

const instance = axios.create({
    // api cloud function url
    baseURL: 'https://us-central1-memag-2c50c.cloudfunctions.net/api'
});

export default instance;