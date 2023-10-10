// require axios
//
import axios from 'axios';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
let config = require("./config.json")

async function remove_do() {
    const response = await axios.get('https://api.digitalocean.com/v2/droplets', {
        params: {
            'page': '1',
            'per_page': '20'
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.do_key
        }
    });
    let i = 1;
    response.data.droplets.forEach(droplet => {
        let serverDelete = axios.delete(`https://api.digitalocean.com/v2/droplets/${droplet.id}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + config.do_key
            }
        });
        console.log("Server Deleted: Slave-DO-", i);
        i++;
    });
}

export default remove_do

