import decode from 'jwt-decode'
import { cookies } from "next/headers"

interface User {
    sub: string
    name: string
    avatar: string
}

export function getUser(): User {
    const token = cookies().get('token')?.value

    if (!token) {
        throw new Error(`token status: ${token}, Error: Unauthenticated (token was not provided).`)
    }

    const user: User = decode(token)

    return user
}