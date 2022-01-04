import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'
import UrlForm from './UrlForm';

describe('UrlForm', () => {
  it('renders input element which has placeholder text and focus', () => {
    const addData = jest.fn();
    
    render(<UrlForm addData={addData} />);
    
    const el: HTMLInputElement = screen.getByTestId('url-input');
    
    expect(el).toBeInTheDocument();
    expect(typeof el.placeholder).toBe('string');
    expect(el).toHaveFocus();
  });

  it('renders submit element and it is disabled initially', () => {
    const addData = jest.fn();

    render(<UrlForm addData={addData} />);
    
    const el: HTMLElement = screen.getByTestId('submit');
    
    expect(el).toBeInTheDocument();
    expect(el).toBeDisabled();
  });

  test('basic validation: valid url', () => {
    const addData = jest.fn();
    
    render(<UrlForm addData={addData} />);
    
    const inputEl: HTMLInputElement = screen.getByTestId('url-input');
    userEvent.type(inputEl, 'https://example.com');
    
    expect(inputEl).toHaveValue('https://example.com');

    const submitEl: HTMLElement = screen.getByTestId('submit');
    
    expect(submitEl).toBeEnabled();
  });

  test('basic validation: invalid url', () => {
    const addData = jest.fn();
    
    render(<UrlForm addData={addData} />);
    
    const inputEl: HTMLInputElement = screen.getByTestId('url-input');
    userEvent.type(inputEl, 'this is me');

    expect(inputEl).toHaveValue('this is me');
    
    const submitEl: HTMLElement = screen.getByTestId('submit');
    
    expect(submitEl).toBeDisabled();
  });
  
  it('sets state on submit', async() => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    render(<UrlForm addData={setState} />);

    const inputEl: HTMLInputElement = screen.getByTestId('url-input');
    userEvent.type(inputEl, 'http://example.com');
    const submitEl: HTMLElement = screen.getByTestId('submit');
    fireEvent.click(submitEl);

    expect(setState).toBeCalled();
  });

  it('submits on enter', async() => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    render(<UrlForm addData={setState} />);

    const el: HTMLInputElement = screen.getByTestId('url-input');
    userEvent.type(el, 'http://example.com');
    userEvent.keyboard('enter');

    expect(setState).toBeCalled();
  });
});
