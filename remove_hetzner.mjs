// require axios
//
import axios from 'axios';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
let config = require("./config.json")

async function remove_hetzner() {
    const response = await axios.get('https://api.hetzner.cloud/v1/servers', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.hetzner_key
        }
    });
    
    let i = 1;
    response.data.servers.forEach(server => {
        let serverDelete = axios.delete(`https://api.hetzner.cloud/v1/servers/${server.id}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + config.hetzner_key
            }
        });
        console.log("Server Deleted: Slave-HETZNER-", i);
    });
}

export default remove_hetzner

