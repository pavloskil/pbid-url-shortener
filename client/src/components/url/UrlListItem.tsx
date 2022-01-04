import * as React from 'react';
import classNames from 'classnames';
import type { Url } from '../../hooks/useGetUrlList';

type Props = {
  item: Url;
  isHeader?: boolean;
}

export default function UrlListItem({item, isHeader = false}: Props): React.ReactElement {  
  return (
    <div className={classNames(['list-item', {'header': isHeader }])} data-testid="url-list-item">
      <div className="text-truncate">{item.full}</div>
      <div className="align-self-end">{item.short}</div>
    </div>
  )
}
