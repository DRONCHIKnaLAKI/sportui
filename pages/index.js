import dynamic from 'next/dynamic';
import Head from 'next/head';

// Динамическая загрузка без SSR
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Карта спортивных секций</title>
      </Head>
      <MapComponent />
    </>
  );
}
