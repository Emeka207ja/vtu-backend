import { Role } from "src/auth/entity/auth.entity"
export type reqUser = {
    user: {
        id: string,
        role:Role[]
    }
}