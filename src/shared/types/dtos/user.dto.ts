import { RoleDTO } from './role.dto'

export interface UserDTO {
	firstName: string
	email: string
	id: number
	kid: string
	lastName: string
	role: RoleDTO
}
