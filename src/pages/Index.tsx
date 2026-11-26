import { useEffect, useLayoutEffect } from 'react';
import { site } from '@/content/site';
import { motionKit } from '@/motion/motionKit';
import { Navigation } from '@/components/site/Navigation';
import { Opening } from '@/components/site/Opening';
import { Buildings } from '@/components/site/Buildings';
import { Scan } from '@/components/site/Scan';
import { Register } from '@/components/site/Register';
import { Colours } from '@/components/site/Colours';
import { Neighbours } from '@/components/site/Neighbours';
import { Floors } from '@/components/site/Floors';
import { Studio } from '@/components/site/Studio';
import { Faq } from '@/components/site/Faq';
import { Contact } from '@/components/site/Contact';
import { Footer } from '@/components/site/Footer';

export default function Index() {
  // Layout effects run before the sections' passive effects, so the shared motion layer
  // (item numbering, enter-on-scroll, smooth wheel, paused off-screen loops) is ready when
  // the scene scripts measure.
  useLayoutEffect(() => motionKit.start(), []);

  useEffect(() => {
    document.title = site.meta.title;
    // Land on the hash target when the page is opened with one (e.g. /#contact).
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <Opening />
        <Buildings />
        <Scan />
        <Register />
        <Colours />
        <Neighbours />
        <Floors />
        <Studio />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
