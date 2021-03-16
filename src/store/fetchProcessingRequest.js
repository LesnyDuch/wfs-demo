import { fetchRequestPending, fetchRequestError, fetchRequestSuccess } from './actions';

/**
 * 
 * @param dispatch Dispatch object
 * @param requestID ID for the processing request to be retrieved
 * @param apiKey Api Key 
 */
function fetchProcessingRequest(dispatch, requestID, apiKey='api_key') {
  console.log(requestID, apiKey)
  return dispatch => {
    dispatch(fetchRequestPending());
    fetch(`https://api-dynacrop.worldfromspace.cz/api/v2/processing_request/${requestID}?api_key=${apiKey}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status}`)
        }
        return res.json()
    })
    .then(body => dispatch(fetchRequestSuccess(body)))
    .catch(error => dispatch(fetchRequestError(error.message)))
  }
}

export default fetchProcessingRequest;