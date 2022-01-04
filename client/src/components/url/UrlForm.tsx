import * as React from 'react';
import { useMemo } from 'react';
import classNames from 'classnames';
import useAddUrl from '../../hooks/useAddUrl';
import type { APIResponse } from '../../hooks/useGetUrlList';

export default function Form({ addData }: { addData: Function}) {
  const [urlValue, setUrlValue] = React.useState<string>(''); 
  const [isValidUrl, setIsValidUrl] = React.useState<boolean>(false); 
  const addUrl = useAddUrl();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value }  = e.target;
    // URL basic validation
    const regex: RegExp = new RegExp(/^(http|https):\/\/[^ "]+$/);
    const isUrl: boolean = regex.test(value);
    setUrlValue(e.target.value);
    setIsValidUrl(isUrl);
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    addUrl(urlValue)
      .then(({ data }: APIResponse) => {
        addData(data);
        setUrlValue('');
      })
      .catch((error: Error): void => {
        console.log(error);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (!isValidUrl && e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(e);
    }
  }

  const isInvalid = useMemo(() => urlValue.length && !isValidUrl, [urlValue, isValidUrl]);
  const className = ['text-error', { hidden: !isInvalid }];

  return (
    <div className="form-wrapper">
      <form action="post" onSubmit={handleSubmit} data-testid="url-form">
        <label htmlFor="url" className="label">Enter URL:</label>
        <input
          type="text"
          name="url"
          id="url"
          className={classNames(['input', { error: isInvalid }])}
          placeholder="Type or paste in a URL link to shorten it"
          value={urlValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          data-testid="url-input"
          autoFocus
        />
        <button className="button" data-testid="submit" disabled={!isValidUrl}>Shorten</button>
        <div className={classNames(className)} data-testid="error-text">
          The entered value is not a valid URL
        </div>
      </form>
    </div>
  )
}
