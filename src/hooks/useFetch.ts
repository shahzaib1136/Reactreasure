import { useEffect, useState } from 'react';

export const useFetch = <T = unknown>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const { signal } = controller; // Get the signal from the controller
    let isMounted = true; // Flag to track if the component is mounted

    const fetchData = async () => {
      setLoading(true); // Start loading state
      setError(null); // Clear previous error

      try {
        const response = await fetch(url, { signal }); // Pass the signal to the fetch request

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result: T = await response.json();

        if (isMounted) {
          setData(result); // Set the fetched data if mounted
        }
      } catch (err: any) {
        if (err.name !== 'AbortError' && isMounted) {
          setError(err.message); // Set error message if not aborted
        }
      } finally {
        if (isMounted) {
          setLoading(false); // Always set loading to false if mounted
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Set the flag to false when unmounted
      controller.abort(); // Abort the fetch request on cleanup
    };
  }, [url]);

  return { data, loading, error };
};
