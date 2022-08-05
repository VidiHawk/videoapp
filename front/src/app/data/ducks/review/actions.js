import types from "./types";

export function getPendingList(params) {
    return {
        CALL_API: [
            {
                type: types.GET_PENDING_LIST,
                meta: {
                    path: `/v1/reviews/pendingList?page=${params.page}&limit=${params.limit}`,
                    method: "GET"
                }
            }
        ]
    }
}


export function getReviewedList(params) {
    return {
        CALL_API: [
            {
                type: types.GET_REVIEWED_LIST,
                meta: {
                    path: `/v1/reviews/reviewedList?page=${params.page}&limit=${params.limit}`,
                    method: "GET"
                }
            }
        ]
    }
}

export function postReview(body) {
    return {
        CALL_API: [
            {
                type: types.POST_REVIEW,
                meta: {
                    path: `/v1/reviews/postReview`,
                    method: "POST",
                    body
                }
            }
        ]
    }
}


export function deleteReview(reviewId) {
    return {
        CALL_API: [
            {
                type: types.DELETE_REVIEW,
                meta: {
                    path: `/v1/reviews/delete?id=${reviewId}`,
                    method: "GET"
                }
            }
        ]
    }
}


export function generateSignedUrl(filename, type = null) {
    let url = `/v1/common/signedUrl?filename=${filename}`
    if(type) url += `&type=${type}`
    return {
        CALL_API: [
            {
                type: types.GENERATE_SIGNED_URL,
                meta: {
                    path: url,
                    method: "GET"
                }
            }
        ]
    }
}



export function checkAndGetReviewId(productId) {
    let url = `/v1/reviews/checkAndGetReviewId?productId=${productId}`
    return {
        CALL_API: [
            {
                type: types.CHECK_AND_GET_REVIEW_ID,
                meta: {
                    path: url,
                    method: "GET"
                }
            }
        ]
    }
}
