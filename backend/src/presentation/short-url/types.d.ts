import type { Database } from "../../data/turso"

export type Envs = {
	TURSO_DB_URL: string
	TURSO_TOKEN: string
}

export type Variables = {
	db: Database
}
