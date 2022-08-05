import types from './types'

export function login(body, headers) {
    return {
        CALL_API: [
            {
                type: types.LOGIN,
                meta: {
                    path: `/v1/users/user/verify`,
                    method: "POST",
                    headers,
                    body
                }
            }
        ]
    }
}

export function register(body) {
    return {
        CALL_API: [
            {
                type: types.REGISTER,
                meta: {
                    path: `/v1/users/user/register`,
                    method: "POST",
                    body
                }
            }
        ]
    }
}


export function me() {
    return {
        CALL_API: [
            {
                type: types.ME,
                meta: {
                    path: `/v1/users/myprofile`,
                    method: "GET"
                }
            }
        ]
    }
}


export function editProfile(body) {
    return {
        CALL_API: [
            {
                type: types.EDIT_PROFILE,
                meta: {
                    path: `/v1/users/user`,
                    method: "PATCH",
                    body
                }
            }
        ]
    }
}

export function changePassword(body) {
    return {
        CALL_API: [
            {
                type: types.CHANGE_PASSSWORD,
                meta: {
                    path: `/v1/users/user/changePassword`,
                    method: "POST",
                    body
                }
            }
        ]
    }
}

export function resetPassword(body) {
    return {
        CALL_API: [
            {
                type: types.FORGOT_PASSWORD,
                meta: {
                    path: `/v1/users/resetPassword/trigger`,
                    method: 'PATCH',
                    body
                }
            }
        ]
    }
}

export function verifyPassword(body) {
    return {
        CALL_API: [
            {
                type: types.RESET_PASSWORD,
                meta: {
                    path: `/v1/users/resetPassword/verify`,
                    method: "PATCH",
                    body
                }
            }
        ]
    }
}
