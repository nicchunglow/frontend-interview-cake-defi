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
        describe('BTC', () => {
          test('should have change receive input display from BTC to ETH ', async () => {
            const swapTokenValue = 'bitcoin';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  eth: 2,
                },
              },
            });
            render(<Exchange />);
            const receiveTokenValue = 'ethereum';
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
          test('should have change receive input display from BTC to DFI ', async () => {
            const swapTokenValue = 'defichain';
            const receiveTokenValue = 'bitcoin';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
          test('should have change receive input display from BTC to DOGE ', async () => {
            const swapTokenValue = 'dogecoin';
            const receiveTokenValue = 'bitcoin';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
          test('should have change receive input display from BTC to USDT ', async () => {
            const swapTokenValue = 'tether';
            const receiveTokenValue = 'bitcoin';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
          test('should have change receive input display from BTC to USDT ', async () => {
            const swapTokenValue = 'tether';
            const receiveTokenValue = 'bitcoin';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
        });
        describe('ETH', () => {
          test('should have change receive input display from ETH to DFI ', async () => {
            const swapTokenValue = 'ethereum';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            const receiveTokenValue = 'defichain';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  eth: 2,
                },
              },
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
              expect(ReceiveInput).toHaveValue('1');
            });
          });
          test('should have change receive input display from ETH to DOGE ', async () => {
            const swapTokenValue = 'ethereum';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            const receiveTokenValue = 'dogecoin';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  eth: 2,
                },
              },
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
              expect(ReceiveInput).toHaveValue('1');
            });
          });
          test('should have change receive input display from ETH to USDT ', async () => {
            const swapTokenValue = 'ethereum';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            const receiveTokenValue = 'tether';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  eth: 2,
                },
              },
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
              expect(ReceiveInput).toHaveValue('1');
            });
          });
        });
        describe('DFI', () => {
          test('should have change receive input display from DFI to BTC ', async () => {
            const swapTokenValue = 'defichain';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
            });
            render(<Exchange />);
            const receiveTokenValue = 'bitcoin';
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
          test('should have change receive input display from DFI to ETH ', async () => {
            const swapTokenValue = 'defichain';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  eth: 2,
                },
              },
            });
            render(<Exchange />);
            const receiveTokenValue = 'ethereum';
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
          test('should have change receive input display from DFI to USDT ', async () => {
            const swapTokenValue = 'defichain';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              tickers: [
                {
                  base: 'DFI',
                  target: 'USDT',
                  last: 2,
                  target_coin_id: 'tether',
                },
              ],
            });
            render(<Exchange />);
            const receiveTokenValue = 'tether';
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
        });
        describe('DOGE', () => {
          test('should have change receive input display from DOGE to BTC ', async () => {
            const swapTokenValue = 'dogecoin';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
            });
            render(<Exchange />);
            const receiveTokenValue = 'bitcoin';
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
          test('should have change receive input display from DOGE to ETH ', async () => {
            const swapTokenValue = 'dogecoin';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  eth: 2,
                },
              },
            });
            render(<Exchange />);
            const receiveTokenValue = 'ethereum';
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
          test('should have change receive input display from DOGE to USDT ', async () => {
            const swapTokenValue = 'dogecoin';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              tickers: [
                {
                  last: 2,
                  coin_id: 'dogecoin',
                  target_coin_id: 'tether',
                },
              ],
            });
            render(<Exchange />);
            const receiveTokenValue = 'tether';
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
          test('should have change receive input display from DOGE to DFI ', async () => {
            const swapTokenValue = 'dogecoin';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              tickers: [
                {
                  last: 2,
                  coin_id: 'dogecoin',
                  target_coin_id: 'defichain',
                },
              ],
            });
            render(<Exchange />);
            const receiveTokenValue = 'defichain';
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });
        });

        describe('USDT', () => {
          test('should have change receive input display from USDT to BTC ', async () => {
            const swapTokenValue = 'tether';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
            });
            render(<Exchange />);
            const receiveTokenValue = 'bitcoin';
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });

          test('should have change receive input display from USDT to ETH ', async () => {
            const swapTokenValue = 'tether';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  eth: 2,
                },
              },
            });
            render(<Exchange />);
            const receiveTokenValue = 'ethereum';
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
              expect(ReceiveInput).toHaveValue('4');
            });
          });

          test('should have change receive input display from USDT to DFI ', async () => {
            const swapTokenValue = 'tether';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              tickers: [],
            });
            const receiveTokenValue = 'defichain';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              tickers: [
                {
                  base: 'DFI',
                  last: 2,
                  target_coin_id: 'tether',
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
              expect(ReceiveInput).toHaveValue('1');
            });
          });
        });
      });
      describe('Receive', () => {
        describe('BTC', () => {
          test('should have change swap input display from BTC to DFI ', async () => {
            const receiveTokenValue = 'bitcoin';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            const swapTokenValue = 'defichain';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
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
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('1');
            });
          });
          test('should have change swap input display from BTC to DOGE ', async () => {
            const receiveTokenValue = 'bitcoin';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            const swapTokenValue = 'dogecoin';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
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
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('1');
            });
          });
          test('should have change swap input display from BTC to USDT ', async () => {
            const receiveTokenValue = 'bitcoin';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            const swapTokenValue = 'tether';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
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
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('1');
            });
          });
        });
        describe('ETH', () => {
          test('should have change swap input display from ETH to BTC ', async () => {
            const receiveTokenValue = 'ethereum';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 2,
                },
              },
            });
            render(<Exchange />);
            const swapTokenValue = 'bitcoin';
            const SwapSelect = screen.getByLabelText('swap-token-select');
            const receiveSelect = screen.getByLabelText('receive-token-select');
            userEvent.selectOptions(SwapSelect, swapTokenValue);
            userEvent.selectOptions(receiveSelect, receiveTokenValue);
            await waitFor(() => {
              expect(SwapSelect).toHaveValue(swapTokenValue);
              expect(receiveSelect).toHaveValue(receiveTokenValue);
            });
            const SwapInput = screen.getByLabelText('swap-input');
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('4');
            });
          });
          test('should have change swap input display from ETH to DFI ', async () => {
            const receiveTokenValue = 'ethereum';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            const swapTokenValue = 'defichain';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  eth: 2,
                },
              },
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
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('1');
            });
          });
          test('should have change swap input display from ETH to DFI ', async () => {
            const receiveTokenValue = 'ethereum';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            const swapTokenValue = 'dogecoin';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  eth: 2,
                },
              },
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
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('1');
            });
          });
          test('should have change swap input display from ETH to USDT ', async () => {
            const receiveTokenValue = 'ethereum';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {},
              },
            });
            const swapTokenValue = 'tether';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  eth: 2,
                },
              },
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
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('1');
            });
          });
        });
        describe('DFI', () => {
          test('should have change swap input display from DFI to USDT ', async () => {
            const receiveTokenValue = 'defichain';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              tickers: [
                {
                  base: 'DFI',
                  last: 2,
                  target_coin_id: 'tether',
                },
              ],
            });
            render(<Exchange />);
            const swapTokenValue = 'tether';
            const SwapSelect = screen.getByLabelText('swap-token-select');
            const receiveSelect = screen.getByLabelText('receive-token-select');
            userEvent.selectOptions(SwapSelect, swapTokenValue);
            userEvent.selectOptions(receiveSelect, receiveTokenValue);
            await waitFor(() => {
              expect(SwapSelect).toHaveValue(swapTokenValue);
              expect(receiveSelect).toHaveValue(receiveTokenValue);
            });
            const SwapInput = screen.getByLabelText('swap-input');
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('1');
            });
          });
        });
        describe('USDT', () => {
          test('should have change swap input display from USDT to DFI ', async () => {
            const receiveTokenValue = 'tether';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              tickers: [],
            });
            const swapTokenValue = 'defichain';
            mock.onGet(`/coins/${swapTokenValue}`).reply(200, {
              success: true,
              tickers: [
                {
                  base: 'DFI',
                  last: 2,
                  target_coin_id: 'tether',
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
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('1');
            });
          });
        });
        describe('DOGE', () => {
          test('should have change receive input display from DOGE to BTC ', async () => {
            const receiveTokenValue = 'dogecoin';
            const swapTokenValue = 'bitcoin';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              market_data: {
                current_price: {
                  btc: 0.5,
                },
              },
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
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('1');
            });
          });
          test('should have change receive input display from DOGE to DFI ', async () => {
            const receiveTokenValue = 'dogecoin';
            const swapTokenValue = 'defichain';
            mock.onGet(`/coins/${receiveTokenValue}`).reply(200, {
              success: true,
              tickers: [
                {
                  last: 2,
                  coin_id: receiveTokenValue,
                  target_coin_id: swapTokenValue,
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
            const ReceiveInput = screen.getByLabelText('receive-input');
            fireEvent.change(ReceiveInput, { target: { value: 2 } });
            expect(ReceiveInput).toBeInTheDocument();
            await waitFor(() => {
              expect(SwapInput).toHaveValue('1');
            });
          });
        });
      });
    });
  });
});
