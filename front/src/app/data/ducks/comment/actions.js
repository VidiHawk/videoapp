import types from "./types";

export function getList(params) {
    return {
        CALL_API: [
            {
                type: types.GET_LIST,
                meta: {
                    path: `/v1/comment/list?videoId=${params.videoId}&offset=${params.offset}&limit=${params.limit}`,
                    method: "GET"
                }
            }
        ]
    }
}

export function postComment(body) {
    return {
        CALL_API: [
            {
                type: types.POST_COMMENT,
                meta: {
                    path: `/v1/comment/post`,
                    method: "POST",
                    body
                }
            }
        ]
    }
}

export function likeComment(commentId) {
    return {
        CALL_API: [
            {
                type: types.LIKE_COMMENT,
                meta: {
                    path: `/v1/comment/like?commentId=${commentId}`,
                    method: "GET"
                }
            }
        ]
    }
}

export function dislikeComment(commentId) {
    return {
        CALL_API: [
            {
                type: types.DISLIKE_COMMENT,
                meta: {
                    path: `/v1/comment/dislike?commentId=${commentId}`,
                    method: "GET"
                }
            }
        ]
    }
}

export function deleteComment(videoId) {
    return {
        CALL_API: [
            {
                type: types.DELETE_COMMENT,
                meta: {
                    path: `/v1/comment/delete?id=${videoId}`,
                    method: "DELETE"
                }
            }
        ]
    }
}