import { AppRoutes, Server } from "./presentation";

(() => {
	main();
})();

function main() {
	new Server({ routes: AppRoutes.routes }).start();
}
