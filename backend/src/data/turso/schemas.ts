import { sql } from "drizzle-orm"
import { text, integer, sqliteTable  } from "drizzle-orm/sqlite-core"

export const urls = sqliteTable("urls", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	longUrl: text("long_url").notNull(),
	shortUrl: text("short_url").notNull().unique(),
	createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})
