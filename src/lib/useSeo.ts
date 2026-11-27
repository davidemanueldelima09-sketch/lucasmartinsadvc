import { useEffect } from 'react';

const DEFAULT = {
  title: 'Viñas Café — Cafeteria no Sobral Shopping | Sobral, CE',
  description: 'Viñas Café: croissants, chocolate quente, frapês, tapiocas, cuscuz, toasts e doces no Sobral Shopping. Mais que um café, uma experiência. Peça pelo WhatsApp ou aiqfome.',
};

function setMeta(sel: string, attr: string, key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(sel);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.content = value;
}

/** Atualiza título/description/OG por rota (o build também gera HTML estático por produto). */
export function useSeo(meta: { title: string; description: string; image?: string; path: string } | null) {
  useEffect(() => {
    if (!meta) return;
    const origin = window.location.origin;
    document.title = meta.title;
    setMeta('meta[name="description"]', 'name', 'description', meta.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    if (meta.image) setMeta('meta[property="og:image"]', 'property', 'og:image', origin + meta.image);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = origin + meta.path;
    return () => {
      document.title = DEFAULT.title;
      setMeta('meta[name="description"]', 'name', 'description', DEFAULT.description);
      setMeta('meta[property="og:title"]', 'property', 'og:title', DEFAULT.title);
      setMeta('meta[property="og:description"]', 'property', 'og:description', DEFAULT.description);
      link!.href = origin + '/';
    };
  }, [meta?.title, meta?.description, meta?.image, meta?.path]); // eslint-disable-line react-hooks/exhaustive-deps
}
