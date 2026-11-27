import { Suspense, lazy } from 'react';
import { MotionConfig, AnimatePresence } from 'framer-motion';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import About from './sections/About';
import Story from './sections/Story';
import Favorites from './sections/Favorites';
import Menu from './sections/Menu';
import Gallery from './sections/Gallery';
import Visit from './sections/Visit';
import Footer from './sections/Footer';

const ProductStage = lazy(() => import('./components/ProductStage'));

function Home() {
  const loc = useLocation();
  return (
    <>
      <a className="skip" href="#cardapio">Pular para o cardápio</a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Favorites />
        <Menu />
        <Story />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <AnimatePresence>
        {loc.pathname.startsWith('/cardapio/') && (
          <Suspense fallback={null}><Outlet key="stage" /></Suspense>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="cardapio/:slug" element={<ProductStage />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </MotionConfig>
  );
}
