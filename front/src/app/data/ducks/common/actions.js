import types from "./types";

export function loadMenus() {
    return {
        CALL_API: [
            {
                type: types.FETCH_MENUS,
                meta: {
                    path: "/v1/menu/fetch",
                    method: "GET",
                }
            }
        ]
    }
}

export function uploadPhoto(body,type) {
    return {
        CALL_API: [
            {
                type: types.UPLOAD_PHOTO,
                meta: {
                    path: `/v1/image/upload?type=${type}`,
                    method: "POST",
                    body
                }
            }
        ]
    }
}
