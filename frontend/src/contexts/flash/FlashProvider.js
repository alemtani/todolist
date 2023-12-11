import { useState } from 'react';
import FlashContext from './FlashContext';

/**
 * This Provider defines the value that children components access when using the context.
 * @param {*} children - nested JSX components 
 * @returns a Provider for the context
 */
function FlashProvider({ children }) {
    const [message, setMessage] = useState(null);

    /* Set a flash message with a specified duration before it disappears. */
    async function flashMessage(text, variant, duration = 5000) {
        setMessage({ text, variant });
        setTimeout(() => setMessage(null), 5000);
    }

    const value = {
        message,
        flashMessage,
    };

    return (
        <FlashContext.Provider value={value}>
            {children}
        </FlashContext.Provider>
    );
};

export default FlashProvider;
