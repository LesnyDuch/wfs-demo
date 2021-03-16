/**
 * Basic fetch Actions
 */
export const FETCH_REQUEST_PENDING = 'FETCH_REQUEST_PENDING';
export const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
export const FETCH_REQUEST_ERROR = 'FETCH_REQUEST_ERROR';

export function fetchRequestPending() {
    return {
        type: FETCH_REQUEST_PENDING
    }
}

export function fetchRequestSuccess(payload) {
    return {
        type: FETCH_REQUEST_SUCCESS,
        processingRequest: payload
    }
}

export function fetchRequestError(error) {
    return {
        type: FETCH_REQUEST_ERROR,
        error: error
    }
}
