import React, { useEffect, useRef } from 'react';

/**
 * Indicates if the component has been unmounted.
 * @returns {React.MutableRefObject<Boolean>} 
 */
export function useIsCancelled() {
    const isCancelled = useRef(false);

    useEffect(() => {
        return () => {
            isCancelled.current = true;
        };
    }, []);

    return isCancelled;
}
