import { render, screen } from '@testing-library/react';
import UrlList from './UrlList';

describe('UrlList', () => {
  const data = [
    { full: 'https://example.com', short: 'https://pbid.io/abcdef12' },
    { full: 'https://example2.com', short: 'https://pbid.io/12abcdef' }
  ];
  
  it('renders loading', () => {
    render(<UrlList data={data} isLoading={true} error={null} />);

    const el: HTMLElement = screen.getByTestId('loading');    
    
    expect(el).toBeInTheDocument();
  });
  
  it('renders error', () => {
    const error = new Error('error_message');
    
    render(<UrlList data={data} isLoading={false} error={error} />);
    
    const errorEl: HTMLElement = screen.getByTestId('error');    
    
    expect(errorEl).toBeInTheDocument();
    
    const messageEl: HTMLElement = screen.getByText(/error_message/i);    
    
    expect(messageEl).toBeInTheDocument();
  });

  it('renders all the urls (no pagination)', async () => {
    render(<UrlList data={data} isLoading={false} error={null} />);
    
    const el: HTMLElement[] = await screen.findAllByTestId('url-list-item');
    
    expect(el.length).toBe(data.length + 1); // data.length + header
  });
});

