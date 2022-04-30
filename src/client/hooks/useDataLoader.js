import React, { useEffect, useRef } from 'react';

/**
 * 
 * @param {Promise} loadPromise Promise to load data.
 * @param {Function} resultCallback Called when data successfuly loaded if the component is still mounted.
 * @param {Function} doneCallback Called in the end of the request if the component is still mounted.
 * @returns {React.MutableRefObject<Boolean>} Indicator if component is still loading.
 */
export function useDataLoader(loadPromise, resultCallback) {
    const isCancelled = useRef(false);
    const isLoading = useRef(true);

    useEffect(() => {
        console.log('Called');

        loadPromise
            .then(data => {
                if (!isCancelled.current) {
                    resultCallback(data);
                }
            })
            .catch(error => {
                if (!isCancelled.current) {
                    console.log(error);
                }
            })
            .finally(() => {
                isLoading.current = false;
            });

        return () => {
            isCancelled.current = true;
        };
    }, []);

    return isLoading;
}