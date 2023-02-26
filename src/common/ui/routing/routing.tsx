import { Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from '../../../pages/book';
import { LayoutMainPage, MainPage, Terms } from '../../../pages/main';
import { Profile } from '../../../pages/profile';
import { Layout } from '../layout';

export const Routing = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route element={<LayoutMainPage />}>
        <Route path='/' element={<Navigate to='/books/all' />} />
        <Route path='/books/:category' element={<MainPage />} />
        <Route path='/terms' element={<Terms contentView='terms' />} />
        <Route path='/contract' element={<Terms contentView='contract' />} />
      </Route>
      <Route path='/profile' element={<Profile />} />
      <Route path='/books/:category/:bookId' element={<BookPage />} />
    </Route>
  </Routes>
);
