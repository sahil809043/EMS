export const baseUrl = 'http://localhost:3000/api/v1';

//post request
export const postRequest = async (url, body) => {
    console.log('body: ', body);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Request failed:', error.message);
        return { error: error.message };
    }
};

//get request
export const getRequest = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '', // Set Authorization header if token exists
                ...options.headers
            },
            credentials: 'include' // Include cookies if necessary
        });

        const contentType = response.headers.get('Content-Type');

        if (!response.ok) {
            // Attempt to read response as text (could be HTML) if not JSON
            const errorText = await response.text();
            let message = contentType.includes('text/html')
                ? 'Received HTML error page. Check the URL or server response.'
                : 'An error occurred.';
            return { error: true, message: message };
        }

        // Attempt to read response as JSON
        if (contentType.includes('application/json')) {
            const data = await response.json();
            return data;
        } else {
            // Handle unexpected content type
            const text = await response.text();
            return { error: true, message: `Unexpected response format: ${text} ` };
        }
    } catch (error) {
        console.error(`CLIENT::UTILS::SERVICES::getRequest -> ${error.message}`);
        return { error: error.message };
    }
};


