import axios from 'axios';

// set the api URL with amount of data and language
const URL = 'https://randomuser.me/api/?results=50&nat=us';

export default {
    getUsers: function() {
        return axios.get(URL);
    }
};