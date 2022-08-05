import types from "./types";
import config from "./../../../../config/index";

export function loadDetail(slug) {
    return {
        CALL_API: [
            {
                type: types.FETCH_DETAIL,
                meta: {
                    path: `/v1/product/detail?slug=${slug}`,
                    method: "GET"
                }
            }
        ]
    }
}


export function loadFullDetail(slug) {
    return {
        CALL_API: [
            {
                type: types.FETCH_FULL_DETAIL,
                meta: {
                    path: `/v1/product/detailwithVideo?slug=${slug}`,
                    method: "GET"
                }
            }
        ]
    }
}


export function loadReviews(slug) {
    return {
        CALL_API: [
            {
                type: types.FETCH_REVIEWS,
                meta: {
                    path: `/v1/product/reviews?slug=${slug}`,
                    method: "GET"
                }
            }
        ]
    }
}


export function loadProductMenus(slug) {
    return {
        CALL_API: [
            {
                type: types.FETCH_PRODUCT_MENUS,
                meta: {
                    path: `/v1/productMenu/menus?slug=${slug}`,
                    method: "GET"
                }
            }
        ]
    }
}


export function loadProductEntities(slug, entitySlug) {
    return {
        CALL_API: [
            {
                type: types.FETCH_PRODUCT_ENTITIES,
                meta: {
                    path: `/v1/productMenu/link?slug=${entitySlug}&productSlug=${slug}`,
                    method: "GET",
                    entitySlug
                }
            }
        ]
    }
}

export function flushProduct(){
    return {
        type: types.FLUSH_PRODUCT
    }
}