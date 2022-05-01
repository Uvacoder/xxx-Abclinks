import '@/css/fonts.css';
import '@/css/main.css';

import * as React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';

import { Title } from '@/components/title';
import { RootLayout } from '@/components/templates/root-layout';

import type { TMeta } from '@/types/meta.type';
import type { TAppPropsWithLayout, TProps } from '@/types/app.type';

const progress = new ProgressBar({
  size: 2,
  color: '#22d3ee',
  className: 'bar-of-progress',
  delay: 100,
});

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start();
  progress.finish();
}

Router.events.on('routeChangeStart', () => progress.start());
Router.events.on('routeChangeComplete', () => progress.finish());
Router.events.on('routeChangeError', () => progress.finish());

const defaultMeta: TMeta = {
  title: 'Home',
  description: 'Links Fahmi Idris',
  url: 'https://links.fahmiidris.dev',
  image: 'https://links.fahmiidris.dev/default-social-image.png',
  type: 'website',
  robots: 'follow, index',
};

const MyApp = ({ Component, pageProps, router }: TAppPropsWithLayout) => {
  const { Layout, meta: customMeta }: TProps = Component.Props || { Layout: RootLayout };

  const meta: TMeta & {
    templateTitle?: string;
  } = { ...defaultMeta, ...customMeta };

  return (
    <>
      <Title suffix="links.fahmiidris.dev">{meta.title}</Title>
      <Head>
        <meta name="robots" content={meta.robots} />
        <meta name="description" content={meta.description} />
        <meta property="og:url" content={`${meta.url}${router.asPath}`} />
        <link rel="canonical" href={`${meta.url}${router.asPath}`} />

        {/* Open Graph */}
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta name="image" property="og:image" content={meta.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FahmiIdrisA" />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
