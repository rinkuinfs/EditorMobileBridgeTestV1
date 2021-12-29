import { renderHook } from '@testing-library/react-hooks';
import { Provider as CollabProvider } from '@atlaskit/collab-provider';
import { sleep } from '@atlaskit/editor-test-helpers/sleep';
import { useCollabListeners } from '../../use-collab-listeners';
import WebBridgeImpl from '../../../native-to-web';
import { toNativeBridge } from '../../../web-to-native';

describe('setup', () => {
  it('should setup listeners correctly', async () => {
    const onMock = jest.fn();
    const offMock = jest.fn();

    const provider = ({
      on: onMock,
      off: offMock,
    } as unknown) as CollabProvider;

    const bridge = new WebBridgeImpl();
    const { rerender } = renderHook<
      { provider: Promise<CollabProvider> | undefined },
      void
    >(
      ({ provider }) =>
        useCollabListeners(bridge, {
          provider: provider as Promise<CollabProvider>,
        }),
      { initialProps: { provider: Promise.resolve(provider) } },
    );

    // We need to wait for the provider promise to resolve
    await sleep(0);

    expect(onMock.mock.calls).toHaveLength(2);
    expect(onMock.mock.calls[0][0]).toBe('metadata:changed');
    expect(onMock.mock.calls[1][0]).toBe('error');

    rerender({ provider: undefined });

    // Wait for the provider to resolve
    await sleep(0);

    expect(offMock.mock.calls).toHaveLength(2);
    expect(offMock.mock.calls[0][0]).toBe('metadata:changed');
    expect(offMock.mock.calls[1][0]).toBe('error');
  });
});

describe('pageTitle', () => {
  it('should call updateTitle when provider fires metadata:change', async () => {
    const onMock = jest.fn();

    const provider = ({
      on: onMock,
    } as unknown) as CollabProvider;

    const bridge = new WebBridgeImpl();
    const updateTitleSpy = jest.spyOn(toNativeBridge, 'updateTitle');
    renderHook<{ provider: Promise<CollabProvider> }, void>(
      ({ provider }) =>
        useCollabListeners(bridge, {
          provider: provider as Promise<CollabProvider>,
        }),
      { initialProps: { provider: Promise.resolve(provider) } },
    );

    // Wait for provider to resolve
    await sleep(0);

    onMock.mock.calls[0][1]({ title: 'Test title' });
    expect(updateTitleSpy.mock.calls).toHaveLength(1);
    expect(updateTitleSpy.mock.calls[0][0]).toBe('Test title');
  });
});

describe('onCollabError', () => {
  it('should call onCollabError when provider fires error', async () => {
    const onMock = jest.fn();

    const provider = ({
      on: onMock,
    } as unknown) as CollabProvider;

    const bridge = new WebBridgeImpl();
    const onCollabErrorSpy = jest.spyOn(toNativeBridge, 'onCollabError');
    renderHook<{ provider: Promise<CollabProvider> }, void>(
      ({ provider }) =>
        useCollabListeners(bridge, {
          provider: provider as Promise<CollabProvider>,
        }),
      { initialProps: { provider: Promise.resolve(provider) } },
    );

    // Wait for provider to resolve
    await sleep(0);

    onMock.mock.calls[1][1]({ message: 'Error message' });
    expect(onCollabErrorSpy.mock.calls).toHaveLength(1);
    expect(onCollabErrorSpy.mock.calls[0][0]).toBe('Error message');
  });
});
