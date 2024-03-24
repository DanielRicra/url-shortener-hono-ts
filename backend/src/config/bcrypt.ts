import { hashSync } from "bcryptjs"

export class BcryptAdapter {
	static hash(s: string): string {
		return hashSync(s)
	}
}
