import { Suspense } from 'react';
import { IPropsChildren } from '../types/common.types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = (props: IPropsChildren) => {
  const { children } = props;

  return (
    <main className="pl-[360px]">
      <Sidebar />
      <section className="overflow-auto pt-24">
        <Header />
        <div className="px-6 pb-8 pt-4">
          <Suspense fallback={<h3>Loading...</h3>}>{children}</Suspense>
        </div>
      </section>
    </main>
  );
};
