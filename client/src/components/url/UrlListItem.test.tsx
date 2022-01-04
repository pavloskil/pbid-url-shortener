import { render, screen } from '@testing-library/react';
import UrlListItem from './UrlListItem';

describe('UrlListItem', () => {
  const item = { full: 'Full URL', short: 'Short URL' };

  it('renders full and short properties', () => {
    render(<UrlListItem item={item} />);

    const fullEl: HTMLElement = screen.getByText(/Full URL/i);
    const shortEl: HTMLElement = screen.getByText(/Short URL/i);

    expect(fullEl).toBeInTheDocument();
    expect(shortEl).toBeInTheDocument();
  });

  it('adds a `header` CSS class if isHeader prop is true', () => {
    render(<UrlListItem item={item} isHeader />);

    const el: HTMLElement = screen.getByTestId('url-list-item');

    expect(el.className).toContain('header');
  });
});

