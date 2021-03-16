/**
 * Fetch actions reducer
 */
import {FETCH_REQUEST_ERROR, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_PENDING} from './actions';

/**
 * Initial state, contains data for Processing Request ID 1
 */
const initialState = {
    processingRequest : {
      'result': {
        'tiles_color': 'https://tiler.worldfromspace.cz/{z}/{x}/{y}.png?url=https://dev-dynacrop-data.s3.amazonaws.com/e6185d63d944561ccc69b8ae0cc1c983723f059b5a6d52251a4dfb0e6459fc3f/observation_color.tiff&nodata=0&resampling_method=nearest' 
      },
      'polygon': {
        'geometry': 'POLYGON ((16.5481781959533727 49.2357023251476136, 16.5481781959533727 49.2414464030268206, 16.5551733970642125 49.2414464030268206, 16.5551733970642125 49.2357023251476136, 16.5481781959533727 49.2357023251476136))'
      }
    },
    loading: false,
    error: null
}

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST_PENDING: {
      return {
        ...state,
        loading: true,
        error: null
      }
    }
    case FETCH_REQUEST_SUCCESS: {
      return {
        ...state,
        processingRequest: {...action.processingRequest},
        loading: false
      }
    }
    case FETCH_REQUEST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false
      }
    }
    default:
      return state
  }
}

export const getRequest = state => state.processingRequest;
export const getRequestLoading = state => state.loading;
export const getRequestError = state => state.error;