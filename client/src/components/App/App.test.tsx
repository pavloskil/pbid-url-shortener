
import { render, screen } from '@testing-library/react';
import App from './App';
import type { HookResponse } from '../../hooks/useGetUrlList';

describe('App', () => {
  it('renders h1 and Form', () => {
    jest.mock('../../hooks/useGetUrlList', () => {
      return jest.fn((): HookResponse => ({
        data: null,
        error: null,
        isLoading: true,
        addData: () => {},
      }));
    });

    render(<App />);

    const h1Element = screen.getByText(/URL Shortener/i);
    expect(h1Element).toBeInTheDocument();

    const formElement: HTMLElement = screen.getByTestId('url-form');
    expect(formElement).toBeInTheDocument();
  });
});