// require axios
//
import axios from 'axios';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
let config = require("./config.json")

async function remove_vultr() {
    const response = await axios.get('https://api.vultr.com/v2/instances', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.vultr_key
        }
    });
    let i = 1;
    response.data.instances.forEach(instance => {
        let serverDelete = axios.delete(`https://api.vultr.com/v2/instances/{${instance.id}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + config.vultr_key
            }
        });
        console.log("Server Deleted: Slave-VULTR-", i);
    });
}

export default remove_vultr


