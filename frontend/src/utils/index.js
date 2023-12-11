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

/* Utility function to convert end-of-day today to UTC time. */
function getEndOfDayInUtc() {
    // Extract the current date into endOfDay object
    const currentDate = new Date();
    const endOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        23,
        59,
        59,
        999
    );

    // Increment minutes to get UTC time
    endOfDay.setMinutes(endOfDay.getMinutes() + endOfDay.getTimezoneOffset());
    return endOfDay;
}

export {
    callApi,
    formatTimestamp,
    convertUtcToLocal,
    getEndOfDayInUtc,
};
