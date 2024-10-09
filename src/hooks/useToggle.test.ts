import { renderHook, act } from '@testing-library/react-hooks';
import { useToggle } from './useToggle';

describe('useToggle hook', () => {
  it('should initialize with false by default', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.value).toBe(false);
  });

  it('should initialize with true if provided as initial value', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.value).toBe(true);
  });

  it('should toggle value from false to true', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(true);
  });

  it('should toggle value from true to false', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(false);
  });

  it('should set value to true when calling setTrue', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current.setTrue();
    });

    expect(result.current.value).toBe(true);
  });

  it('should set value to false when calling setFalse', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current.setFalse();
    });

    expect(result.current.value).toBe(false);
  });
});
