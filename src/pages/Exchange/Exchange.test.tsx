import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';

import Exchange from 'pages/Exchange';
import { customAxios } from 'service/axios';

const mock = new MockAdapter(customAxios);

describe('Exchange', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should render', () => {
    render(<Exchange />);
    const ExchangeHeaderText = screen.getByLabelText('exchange-header-text');
    expect(ExchangeHeaderText).toBeInTheDocument();

    const ExchangeDateAndTime = screen.getByLabelText('date-and-time');
    expect(ExchangeDateAndTime).toBeInTheDocument();

    const ExchangeSwapTokenText = screen.getByLabelText('swap-token-text');
    expect(ExchangeSwapTokenText).toBeInTheDocument();

    const ExchangeSwapTokenSelect = screen.getByRole('combobox', {
      name: 'swap-token-select',
    });
    expect(ExchangeSwapTokenSelect).toBeInTheDocument();

    const ExchangeReceiveTokenText =
      screen.getByLabelText('receive-token-text');
    expect(ExchangeReceiveTokenText).toBeInTheDocument();

    const ExchangeReceiveTokenSelect = screen.getByRole('combobox', {
      name: 'receive-token-select',
    });
    expect(ExchangeReceiveTokenSelect).toBeInTheDocument();
  });
  describe('Input', () => {
    describe('Input', () => {
      test('should be disabled if the select has not been selected', () => {
        render(<Exchange />);
        const SwapInput = screen.getByLabelText('swap-input');
        expect(SwapInput).toBeDisabled();
        const ReceiveInput = screen.getByLabelText('receive-input');
        expect(ReceiveInput).toBeDisabled();
      });
    });
    describe('API', () => {
      describe('Swap', () => {
        test('should be able to multiply if using swapToken for api and its receiveToken is target coin', async () => {
          const swapTokenValue = 'bitcoin';
          const receiveTokenValue = 'ethereum';
          mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
            success: true,
            tickers: [
              {
                coin_id: swapTokenValue,
                target_coin_id: receiveTokenValue,
                last: 10,
              },
            ],
          });
          render(<Exchange />);
          const SwapSelect = screen.getByLabelText('swap-token-select');
          const receiveSelect = screen.getByLabelText('receive-token-select');
          userEvent.selectOptions(SwapSelect, swapTokenValue);
          userEvent.selectOptions(receiveSelect, receiveTokenValue);
          await waitFor(() => {
            expect(SwapSelect).toHaveValue(swapTokenValue);
            expect(receiveSelect).toHaveValue(receiveTokenValue);
          });
          const SwapInput = screen.getByLabelText('swap-input');
          fireEvent.change(SwapInput, { target: { value: 2 } });
          const ReceiveInput = screen.getByLabelText('receive-input');
          expect(ReceiveInput).toBeInTheDocument();
          await waitFor(() => {
            expect(ReceiveInput).toHaveValue('20');
          });
        });
        test('should be able to divide if using swapToken for api and its receiveToken is base coin', async () => {
          const swapTokenValue = 'bitcoin';
          const receiveTokenValue = 'ethereum';
          mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
            success: true,
            tickers: [
              {
                target_coin_id: swapTokenValue,
                coin_id: receiveTokenValue,
                last: 10,
              },
            ],
          });
          render(<Exchange />);
          const SwapSelect = screen.getByLabelText('swap-token-select');
          const receiveSelect = screen.getByLabelText('receive-token-select');
          userEvent.selectOptions(SwapSelect, swapTokenValue);
          userEvent.selectOptions(receiveSelect, receiveTokenValue);
          await waitFor(() => {
            expect(SwapSelect).toHaveValue(swapTokenValue);
            expect(receiveSelect).toHaveValue(receiveTokenValue);
          });
          const SwapInput = screen.getByLabelText('swap-input');
          fireEvent.change(SwapInput, { target: { value: 1 } });
          const ReceiveInput = screen.getByLabelText('receive-input');
          expect(ReceiveInput).toBeInTheDocument();
          await waitFor(() => {
            expect(ReceiveInput).toHaveValue('0.1');
          });
        });
        test('should be able to multiply if swapToken has no value,using receiveToken for api and receiveToken is target coin', async () => {
          const swapTokenValue = 'bitcoin';
          const receiveTokenValue = 'ethereum';
          mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
            success: true,
            tickers: [{}],
          });
          mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
            success: true,
            tickers: [
              {
                coin_id: swapTokenValue,
                target_coin_id: receiveTokenValue,
                last: 10,
              },
            ],
          });
          render(<Exchange />);
          const SwapSelect = screen.getByLabelText('swap-token-select');
          const receiveSelect = screen.getByLabelText('receive-token-select');
          userEvent.selectOptions(SwapSelect, swapTokenValue);
          userEvent.selectOptions(receiveSelect, receiveTokenValue);
          await waitFor(() => {
            expect(SwapSelect).toHaveValue(swapTokenValue);
            expect(receiveSelect).toHaveValue(receiveTokenValue);
          });
          const SwapInput = screen.getByLabelText('swap-input');
          fireEvent.change(SwapInput, { target: { value: 2 } });
          const ReceiveInput = screen.getByLabelText('receive-input');
          expect(ReceiveInput).toBeInTheDocument();
          await waitFor(() => {
            expect(ReceiveInput).toHaveValue('20');
          });
        });
        test('should be able to divide if swapToken has no value,using receiveToken for api and receiveToken is base coin', async () => {
          const swapTokenValue = 'bitcoin';
          const receiveTokenValue = 'ethereum';
          mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
            success: true,
            tickers: [],
          });
          mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
            success: true,
            tickers: [
              {
                target_coin_id: swapTokenValue,
                coin_id: receiveTokenValue,
                last: 10,
              },
            ],
          });
          render(<Exchange />);
          const SwapSelect = screen.getByLabelText('swap-token-select');
          const receiveSelect = screen.getByLabelText('receive-token-select');
          userEvent.selectOptions(SwapSelect, swapTokenValue);
          userEvent.selectOptions(receiveSelect, receiveTokenValue);
          await waitFor(() => {
            expect(SwapSelect).toHaveValue(swapTokenValue);
            expect(receiveSelect).toHaveValue(receiveTokenValue);
          });
          const SwapInput = screen.getByLabelText('swap-input');
          fireEvent.change(SwapInput, { target: { value: 2 } });
          const ReceiveInput = screen.getByLabelText('receive-input');
          expect(ReceiveInput).toBeInTheDocument();
          await waitFor(() => {
            expect(ReceiveInput).toHaveValue('0.2');
          });
        });
      });
      describe('Receive', () => {
        test('should be able to multiply if using receiveToken for api and its swapToken is target coin', async () => {
          const receiveTokenValue = 'ethereum';
          const swapTokenValue = 'bitcoin';
          mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
            success: true,
            tickers: [],
          });

          mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
            success: true,
            tickers: [
              {
                coin_id: receiveTokenValue,
                target_coin_id: swapTokenValue,
                last: 10,
              },
            ],
          });
          render(<Exchange />);
          const SwapSelect = screen.getByLabelText('swap-token-select');
          const receiveSelect = screen.getByLabelText('receive-token-select');
          userEvent.selectOptions(SwapSelect, swapTokenValue);
          userEvent.selectOptions(receiveSelect, receiveTokenValue);
          await waitFor(() => {
            expect(SwapSelect).toHaveValue(swapTokenValue);
            expect(receiveSelect).toHaveValue(receiveTokenValue);
          });
          const ReceiveInput = screen.getByLabelText('receive-input');
          fireEvent.change(ReceiveInput, { target: { value: 2 } });
          const SwapInput = screen.getByLabelText('swap-input');
          expect(SwapInput).toBeInTheDocument();
          await waitFor(() => {
            expect(SwapInput).toHaveValue('20');
          });
        });
        test('should be able to divide if using receiveToken for api and its swapToken is base coin', async () => {
          const receiveTokenValue = 'ethereum';
          const swapTokenValue = 'bitcoin';
          mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
            success: true,
            tickers: [],
          });

          mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
            success: true,
            tickers: [
              {
                target_coin_id: receiveTokenValue,
                coin_id: swapTokenValue,
                last: 10,
              },
            ],
          });
          render(<Exchange />);
          const SwapSelect = screen.getByLabelText('swap-token-select');
          const receiveSelect = screen.getByLabelText('receive-token-select');
          userEvent.selectOptions(SwapSelect, swapTokenValue);
          userEvent.selectOptions(receiveSelect, receiveTokenValue);
          await waitFor(() => {
            expect(SwapSelect).toHaveValue(swapTokenValue);
            expect(receiveSelect).toHaveValue(receiveTokenValue);
          });
          const ReceiveInput = screen.getByLabelText('receive-input');
          fireEvent.change(ReceiveInput, { target: { value: 2 } });
          const SwapInput = screen.getByLabelText('swap-input');
          expect(SwapInput).toBeInTheDocument();
          await waitFor(() => {
            expect(SwapInput).toHaveValue('0.2');
          });
        });
        test('should be able to multiply if using receiveToken has no value, swapToken for api and its swapToken is target coin', async () => {
          const receiveTokenValue = 'ethereum';
          const swapTokenValue = 'bitcoin';
          mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
            success: true,
            tickers: [
              {
                coin_id: receiveTokenValue,
                target_coin_id: swapTokenValue,
                last: 10,
              },
            ],
          });

          mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
            success: true,
            tickers: [],
          });
          render(<Exchange />);
          const SwapSelect = screen.getByLabelText('swap-token-select');
          const receiveSelect = screen.getByLabelText('receive-token-select');
          userEvent.selectOptions(SwapSelect, swapTokenValue);
          userEvent.selectOptions(receiveSelect, receiveTokenValue);
          await waitFor(() => {
            expect(SwapSelect).toHaveValue(swapTokenValue);
            expect(receiveSelect).toHaveValue(receiveTokenValue);
          });
          const ReceiveInput = screen.getByLabelText('receive-input');
          fireEvent.change(ReceiveInput, { target: { value: 2 } });
          const SwapInput = screen.getByLabelText('swap-input');
          expect(SwapInput).toBeInTheDocument();
          await waitFor(() => {
            expect(SwapInput).toHaveValue('20');
          });
        });
        test('should be able to divide if using receiveToken has no value, swapToken for api and its swapToken is base coin', async () => {
          const receiveTokenValue = 'ethereum';
          const swapTokenValue = 'bitcoin';
          mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
            success: true,
            tickers: [
              {
                target_coin_id: receiveTokenValue,
                coin_id: swapTokenValue,
                last: 10,
              },
            ],
          });

          mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
            success: true,
            tickers: [],
          });
          render(<Exchange />);
          const SwapSelect = screen.getByLabelText('swap-token-select');
          const receiveSelect = screen.getByLabelText('receive-token-select');
          userEvent.selectOptions(SwapSelect, swapTokenValue);
          userEvent.selectOptions(receiveSelect, receiveTokenValue);
          await waitFor(() => {
            expect(SwapSelect).toHaveValue(swapTokenValue);
            expect(receiveSelect).toHaveValue(receiveTokenValue);
          });
          const ReceiveInput = screen.getByLabelText('receive-input');
          fireEvent.change(ReceiveInput, { target: { value: 2 } });
          const SwapInput = screen.getByLabelText('swap-input');
          expect(SwapInput).toBeInTheDocument();
          await waitFor(() => {
            expect(SwapInput).toHaveValue('0.2');
          });
        });
      });
    });
  });
});
