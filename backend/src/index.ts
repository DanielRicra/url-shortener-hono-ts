import { envs } from "./config"
import { AppRoutes, Server } from "./presentation"

;(() => {
	main()
})()

function main() {
	new Server({ routes: AppRoutes.routes, port: envs.PORT }).start()
}
