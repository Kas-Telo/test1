import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo/logo.svg';
import { BurgerButtonCustom } from '../../../components/burger-button-custom';
import { BurgerNavigation } from '../../../components/burger-navigation';
import { syncAppActions } from '../../../store/app/app-slice';
import { Alert } from '../../../ui/alert/alert';
import { useActions } from '../../hooks/use-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useScrollLock } from '../../hooks/use-scroll-lock';
import { Size, useWindowSize } from '../../hooks/use-window-size';

import { UserBlock } from './user-block/user-block';

import style from './header.module.css';

export const Header = () => {
  const { unlockScroll, lockScroll } = useScrollLock();
  const size: Size = useWindowSize();
  const error = useAppSelector((state) => state.app.appError);
  const { setAppError } = useActions(syncAppActions);

  const [isOpenMenu, toggleMenu] = useState(false);
  const navigationContainer = `${isOpenMenu ? style.visibleNav : style.invisibleNav}`;
  const blurContentVisible = `${isOpenMenu ? style.visibleBlur : ''}`;

  useEffect(() => {
    if (size.width > 1242) {
      toggleMenu(false);
    }
  }, [size.width]);

  useEffect(() => {
    if (isOpenMenu) {
      lockScroll();
    }
    if (!isOpenMenu) {
      unlockScroll();
    }
  }, [isOpenMenu, lockScroll, unlockScroll]);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logoContainer}>
          <Link className={style.logo} to='/books/all'>
            <img src={logo} alt='logo-main-link' />
          </Link>
          <BurgerButtonCustom
            dataTestId='button-burger'
            className={style.burgerMenu}
            isOpenMenu={isOpenMenu}
            toggleMenu={() => toggleMenu(!isOpenMenu)}
          />
          <h3>Библиотека</h3>
        </div>
        <div className={style.userBlock}>
          <UserBlock />
        </div>
      </div>
      {error && (
        <div className={style.alertContainer}>
          <Alert type='error' onClose={() => setAppError({ error: null })}>
            {error}
          </Alert>
        </div>
      )}
      <div className={`${style.containerNav} ${navigationContainer} `}>
        <BurgerNavigation dataTestId='burger-navigation' onClose={() => toggleMenu(false)} />
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={`${blurContentVisible} ${style.blurContainer}`} onClick={() => toggleMenu(!isOpenMenu)} />
    </header>
  );
};
