// /components/NextBreadcrumb.tsx
'use client';

import React, { ReactNode } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Breadcrumb.module.scss';
import Image from 'next/image';

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const iconPATH = '/assets/imgs/template/icons';

const Breadcrumb = ({
  homeElement,
  separator,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths?.split('/').filter((path) => path);

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
        {pathNames?.length > 0 && separator}
        {pathNames?.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;
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
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default Breadcrumb;
