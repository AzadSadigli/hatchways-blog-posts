const axios = require("axios");
const redis = require('redis');
const client = redis.createClient(process.env.PORT);

const getData = async (url,params) => {
    let key = encodeURIComponent(url+JSON.stringify(params));
    return new Promise((resolve,reject) => {
        client.get(key, async (err, data) => {
            if (err) throw err;
            if (data) {
                resolve(JSON.parse(data))
            } else {
                let res = await axios.get(url, { params: params });
                client.set(key, JSON.stringify(res.data), redis.print);
                let new_data = res.data
                resolve(new_data)
            }
        });
    });
    
}

module.exports = {
    getData
};