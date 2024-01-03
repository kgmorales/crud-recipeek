// /components/NextBreadcrumb.tsx
'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Breadcrumb.module.scss';
import Image from 'next/image';

const iconPATH = '/assets/imgs/template/icons';

const Breadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths
    ?.split('/')
    .filter((path) => path)
    .map((name) => name.replaceAll('-', ' '));

  return (
    <>
      <ul className={`${styles.breadcrumb}`}>
        <li>
          <Link className={`${styles.link} color-gray-300`} href={'/'}>
            Home
          </Link>
          <Image
            src={`${iconPATH}/right-arrow.svg`}
            alt="icon"
            width={12}
            height={12}
          />
        </li>
        {pathNames?.length > 0}
        {pathNames?.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          console.log({ href });
          const itemLink = link[0].toUpperCase() + link.slice(1, link.length);
          return (
            <React.Fragment key={index}>
              <li>
                <Link href={href} className={`${styles.link} color-gray-300`}>
                  {itemLink}
                </Link>
                <Image
                  src={`${iconPATH}/right-arrow.svg`}
                  alt="icon"
                  width={12}
                  height={12}
                />
              </li>
              {pathNames.length !== index + 1}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default Breadcrumb;
