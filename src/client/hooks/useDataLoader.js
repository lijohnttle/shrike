import React, { useEffect, useRef, useState } from 'react';

/**
 * 
 * @param {Function} loadPromiseSelector Function to return a promise to load data.
 * @param {Function} resultCallback Called when data successfuly loaded if the component is still mounted.
 * @param {Function} doneCallback Called in the end of the request if the component is still mounted.
 * @param {React.DependencyList} [dependencies] Dependencies that trigger data load.
 * @returns {React.MutableRefObject<Boolean>} Indicator if component is still loading.
 */
export function useDataLoader(loadPromiseSelector, resultCallback, dependencies) {
    const [isLoading, setIsLoading] = useState(true);
    const isCancelled = useRef(false);

    useEffect(() => {
        /** @type {Promise} */
        const promise = loadPromiseSelector();

        if (promise) {
            promise
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
                    if (!isCancelled.current) {
                        setIsLoading(false);
                    }
                });
        }
        
    }, dependencies || []);

    useEffect(() => {
        return () => {
            isCancelled.current = true;
        };
    }, []);

    return isLoading;
}