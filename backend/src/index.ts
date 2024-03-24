import { AppRoutes, Server } from "./presentation"

const server = new Server({ routes: AppRoutes.routes })

export default server.getApp
