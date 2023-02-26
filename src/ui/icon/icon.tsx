import { SVGProps } from 'react';

import { ReactComponent as BurgerMenu } from '../../assets/icons/action/burger-menu.svg';
import { ReactComponent as Close } from '../../assets/icons/action/close.svg';
import { ReactComponent as Search } from '../../assets/icons/action/search.svg';
import { ReactComponent as Slash } from '../../assets/icons/action/slash.svg';
import { ReactComponent as SortAscending } from '../../assets/icons/action/sort-ascending.svg';
import { ReactComponent as SortDescending } from '../../assets/icons/action/sort-descending.svg';
import { ReactComponent as DefaultStar } from '../../assets/icons/action/star/default-star.svg';
import { ReactComponent as OutlineStar } from '../../assets/icons/action/star/outline-star.svg';
import { ReactComponent as Tile } from '../../assets/icons/action/tile.svg';
import { ReactComponent as Error } from '../../assets/icons/alerts/error.svg';
import { ReactComponent as Success } from '../../assets/icons/alerts/success.svg';
import { ReactComponent as ChevronDown } from '../../assets/icons/chevron/down.svg';
import { ReactComponent as ChevronUp } from '../../assets/icons/chevron/up.svg';
import { ReactComponent as Facebook } from '../../assets/icons/social/facebook.svg';
import { ReactComponent as Instagram } from '../../assets/icons/social/inst.svg';
import { ReactComponent as LinkedIn } from '../../assets/icons/social/linked.svg';
import { ReactComponent as Vk } from '../../assets/icons/social/vk.svg';
import { ReactComponent as Loader } from '../../assets/loader/loader.svg';

type DefaultSvgPropsType = SVGProps<SVGSVGElement>;
type Props = DefaultSvgPropsType & {
  title:
    | 'tile'
    | 'burger-menu'
    | 'search'
    | 'sort-ascending'
    | 'sort-descending'
    | 'close'
    | 'instagram'
    | 'facebook'
    | 'vk'
    | 'linked-in'
    | 'default-star'
    | 'outline-star'
    | 'slash'
    | 'chevron-up'
    | 'chevron-down'
    | 'loader'
    | 'success'
    | 'error';
  dataTestId?: string;
};

export const Icon = ({ title, dataTestId, ...restProps }: Props) => {
  switch (title) {
    case 'tile':
      return <Tile {...restProps} />;
    case 'burger-menu':
      return <BurgerMenu data-test-id={dataTestId} {...restProps} />;
    case 'search':
      return <Search {...restProps} />;
    case 'sort-ascending':
      return <SortAscending {...restProps} />;
    case 'sort-descending':
      return <SortDescending {...restProps} />;
    case 'close':
      return <Close data-test-id={dataTestId} {...restProps} />;
    case 'instagram':
      return <Facebook {...restProps} />;
    case 'vk':
      return <Instagram {...restProps} />;
    case 'facebook':
      return <Vk {...restProps} />;
    case 'linked-in':
      return <LinkedIn {...restProps} />;
    case 'default-star':
      return <DefaultStar {...restProps} />;
    case 'outline-star':
      return <OutlineStar {...restProps} />;
    case 'slash':
      return <Slash {...restProps} />;
    case 'chevron-up':
      return <ChevronUp {...restProps} />;
    case 'chevron-down':
      return <ChevronDown {...restProps} />;
    case 'loader':
      return <Loader {...restProps} />;
    case 'success':
      return <Success {...restProps} />;
    case 'error':
      return <Error {...restProps} />;
    default:
      return <svg />;
  }
};
