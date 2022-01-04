import * as React from 'react';
import Loader from 'react-loader-spinner';
import UrlListItem from './UrlListItem';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import type { HookResponse } from '../../hooks/useGetUrlList';

export default function UrlList({ isLoading, data, error }: HookResponse) {  
  if (isLoading) {
    return (
      <div className="my-2" data-testid="loading">
        <Loader
          type="BallTriangle"
          color="#444"
          height={80}
          width={80}
        />
        <div className="mt-1">Loading...</div>
      </div>
    );
  }
  
  if (error) {
    if (error instanceof Error) {
      const { message } = error;
      return (
        <div className="my-2 text-error" data-testid="error">
          <div>An error occured:</div>
          <div>{message}</div>
        </div>
      );
    }
    console.log(error);
  }

  if (!data?.length) {
    return null;
  }

  const headerItem = { full: 'Full URL', short: 'Short URL' };

  return (
    <div className="my-2">
      <div className="mb-1 text-headline">List of shortened URLs</div>
      <UrlListItem item={headerItem} key="header" data-testid="header" isHeader />
      <div>
        {data.map((item: any): React.ReactNode => 
          <UrlListItem
            item={item}
            key={item.short}
            data-testid={item.short}
          />
        )}
      </div>
    </div>
  )
}
