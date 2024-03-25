import type { LibSQLDatabase } from "drizzle-orm/libsql"

export interface Database extends LibSQLDatabase<Record<string, never>> {}
