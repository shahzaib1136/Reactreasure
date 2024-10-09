import { renderHook, act } from '@testing-library/react-hooks';
import { useDialog } from './useDialog';

describe('useDialog hook', () => {
  it('should start with the dialog closed', () => {
    const { result } = renderHook(() => useDialog());

    expect(result.current.isOpen).toBe(false);
  });

  it('should open the dialog when openDialog is called', () => {
    const { result } = renderHook(() => useDialog());

    act(() => {
      result.current.openDialog();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close the dialog when closeDialog is called', () => {
    const { result } = renderHook(() => useDialog());

    act(() => {
      result.current.openDialog();
    });

    act(() => {
      result.current.closeDialog();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
