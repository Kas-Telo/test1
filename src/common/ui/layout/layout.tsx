import { Outlet } from 'react-router-dom';

import { Footer } from '../footer';
import { Header } from '../header';

import style from './layout.module.css';

export const Layout = () => (
  <section className={style.layout}>
    <div className={style.position}>
      <div className={style.container}>
        <Header />
        <main className={style.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  </section>
);
