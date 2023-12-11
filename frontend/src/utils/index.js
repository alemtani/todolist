import moment from 'moment';

/* Utility function to help with API calls. */
async function callApi(endpoint, method, token, body) {
    // Construct the config payload for the API call.
    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };

    // Make the API call.
    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error);
    }

    return result;
}

/* Utility function to format datetime in form. */
function formatTimestamp(timestamp) {
    return moment(new Date(timestamp)).format('YYYY-MM-DDTHH:mm');
}

/* Utility function to convert from UTC time to local time. */
function convertUtcToLocal(timestamp) {
    return moment.utc(timestamp).local().format('MM/DD/YYYY hh:mm A')
}

export {
    callApi,
    formatTimestamp,
    convertUtcToLocal,
};
