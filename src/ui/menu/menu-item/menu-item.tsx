import { MouseEvent, ReactElement } from 'react';

import { IMenuSubItem } from '../menu-sub-item/menu-sub-item';

import { Item } from './item/item';
import { ItemSelector } from './item-selector/item-selector';

export type IMenuItem = {
  title: string;
  children?: ReactElement<IMenuSubItem> | Array<ReactElement<IMenuSubItem>>;
  path: string;
  basedPath: string;
  collapsed?: boolean;
  onClick?: (collapsed: boolean) => void;
  dataTestId?: string;
};

export const MenuItem = ({ title, path, children, collapsed = false, onClick, dataTestId, basedPath }: IMenuItem) => {
  const itemSelectorClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(!collapsed);
    }
  };

  return (
    <div>
      {children ? (
        <ItemSelector
          dataTestId={dataTestId}
          title={title}
          path={path}
          basedPath={basedPath}
          onClickSelector={itemSelectorClick}
          collapsed={collapsed}
        >
          {children}
        </ItemSelector>
      ) : (
        <Item dataTestId={dataTestId} title={title} path={path} />
      )}
    </div>
  );
};
