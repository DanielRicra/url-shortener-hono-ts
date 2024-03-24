import "dotenv/config"
import { get } from "env-var"

export const envs = {
	PORT: get("PORT").required().asPortNumber(),
	HASH_SECRET: get("HASH_SECRET").required().asString(),
}
