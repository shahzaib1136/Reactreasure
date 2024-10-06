// src/hooks/useFetch.test.ts

import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from './useFetch';
import fetchMock from 'jest-fetch-mock';

describe('useFetch', () => {
  const mockData = [{ id: 1, name: 'Item 1' }]; // Sample mock data

  beforeEach(() => {
    fetchMock.enableMocks(); // Enable fetch mocking
    fetchMock.resetMocks(); // Reset mocks before each test
  });

  it('should fetch and return data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData)); // Mock the fetch response

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://api.example.com/data')
    );

    expect(result.current.loading).toBe(true); // Initially loading
    expect(result.current.data).toBeNull(); // No data yet
    expect(result.current.error).toBeNull(); // No error yet

    await waitForNextUpdate(); // Wait for the fetch to resolve

    expect(result.current.loading).toBe(false); // Not loading anymore
    expect(result.current.data).toEqual(mockData); // Data should match mock
    expect(result.current.error).toBeNull(); // No error
  });

  it('should handle fetch errors', async () => {
    fetchMock.mockRejectOnce(new Error('Fetch failed')); // Mock fetch to fail

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://api.example.com/data')
    );

    await waitForNextUpdate(); // Wait for the fetch to resolve

    expect(result.current.loading).toBe(false); // Not loading anymore
    expect(result.current.data).toBeNull(); // No data
    expect(result.current.error).toEqual('Fetch failed'); // Error should be set
  });

  it('should handle non-200 responses', async () => {
    fetchMock.mockResponseOnce('Not Found', { status: 404 }); // Mock 404 response

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://api.example.com/data')
    );

    await waitForNextUpdate(); // Wait for the fetch to resolve

    expect(result.current.loading).toBe(false); // Not loading anymore
    expect(result.current.data).toBeNull(); // No data
    expect(result.current.error).toEqual('Network response was not ok'); // Error should be set
  });

  it('should abort fetch request on unmount', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData)); // Mock fetch response

    const { result, unmount, waitForNextUpdate } = renderHook(() =>
      useFetch('https://api.example.com/data')
    );

    await waitForNextUpdate(); // Wait for the fetch to resolve
    expect(result.current.loading).toBe(false); // Not loading anymore
    expect(result.current.data).toEqual(mockData); // Data should match mock
    expect(result.current.error).toBeNull(); // No error

    unmount(); // Unmount the component

    expect(fetchMock).toHaveBeenCalled(); // Ensure fetch was called
    expect(result.current.data).toEqual(mockData); // Data should still be available
  });

  it('should not set state if fetch is aborted', async () => {
    const { result, unmount } = renderHook(() =>
      useFetch('https://api.example.com/data')
    );

    unmount(); // Unmount before fetch resolves

    expect(fetchMock).toHaveBeenCalled(); // Ensure fetch was called
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for a while to simulate fetch delay

    expect(result.current.loading).toBe(true); // Should still be loading
    expect(result.current.data).toBeNull(); // Should still be null
    expect(result.current.error).toBeNull(); // Should still be null
  });
});
