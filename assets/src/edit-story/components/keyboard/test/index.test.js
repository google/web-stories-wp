import { cleanup, fireEvent, render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useGlobalIsKeyPressed, useIsKeyPressed } from '../index';

const keys = {
  a: { key: 'a', which: 65 },
  b: { key: 'b', which: 66 },
};

/*
 * Runs tests simulating a key being held down for useIsKeyPressed
 * and useGlobalIsKeyPressed.
 * @param {HookResult<boolean>} keyNameOrSpec
 * @param {Node} node
 * @param {Object} key
 * @param {?boolean|true} shouldRegister Whether the key press is registered by
 * the hook.
 */
function testIsKeyPressed(result, node, { key, which }, shouldRegister = true) {
  expect(result.current).toBe(false);

  act(() => {
    fireEvent.keyDown(node, { key, which });
  });

  expect(result.current).toBe(shouldRegister);

  act(() => {
    fireEvent.keyUp(node, { key, which });
  });

  expect(result.current).toBe(false);
}

describe('keyboard/index.js', () => {
  afterEach(cleanup);

  describe('useIsKeyPressed', () => {
    it('should initialise and then register key up and down events', () => {
      const { container } = render(<div />);

      const { result } = renderHook(() => useIsKeyPressed(container, 'a'));
      testIsKeyPressed(result, container, keys.a);
    });

    it('should not register when other keys are pressed', () => {
      const { container } = render(<div />);
      const { result } = renderHook(() => useIsKeyPressed(container, 'a'));
      testIsKeyPressed(result, container, keys.b, false);
    });

    it('should not register key presses on other elements', async () => {
      const { findByText } = render(
        <div>
          <div>ElemWithHook</div>
          <div>ElemWhereKeyPressIsFired</div>
        </div>
      );

      const elemWithHook = await findByText('ElemWithHook');
      const elemWhereKeyPressIsFired = await findByText(
        'ElemWhereKeyPressIsFired'
      );
      const { result } = renderHook(() => useIsKeyPressed(elemWithHook, 'a'));

      testIsKeyPressed(result, elemWhereKeyPressIsFired, keys.a, false);
    });
  });

  describe('useGlobalIsKeyPressed', () => {
    it('should initialise and then register key up and down events', () => {
      const { result } = renderHook(() => useGlobalIsKeyPressed('a'));
      testIsKeyPressed(result, document, keys.a);
    });

    it('should not register when other keys are pressed', () => {
      const { result } = renderHook(() => useGlobalIsKeyPressed('a'));
      testIsKeyPressed(result, document, keys.b, false);
    });

    it('should register key presses on any part of the document', async () => {
      const { container } = render(
        <div>
          <div>elem1</div>
          <div>elem2</div>
          <div>elem3</div>
        </div>
      );

      const elements = container.childNodes;

      const { result } = renderHook(() => useGlobalIsKeyPressed('a'));

      elements.forEach((e) => testIsKeyPressed(result, e, keys.a));
    });
  });
});
