import type { ImageMetadata } from 'astro';
import imgFilho from '../assets/cards/card-filho.jpg';
import imgEstadio from '../assets/cards/card-estadio.jpg';
import imgGameplay from '../assets/cards/card-gameplay.jpg';
import imgCotidiano from '../assets/cards/card-cotidiano.jpg';
import imgNegocios from '../assets/cards/card-negocios.jpg';
import imgTechPosts from '../assets/cards/card-tech-posts.jpg';

// Ilustrações dos cards (Nano Banana Pro, mesmo estilo da capa). Post sem
// heroImage usa a ilustração da sua categoria.
const imagemDaCategoria: Record<string, ImageMetadata> = {
  Tech: imgTechPosts, Negócios: imgNegocios, Games: imgGameplay, Esportes: imgEstadio, Cotidiano: imgCotidiano,
};

// Ordem: imagem própria do card > heroImage > ilustração da categoria (Games do
// Fasolinho usa o cantinho gamer dele, para os posts em dupla não repetirem).
// Usada pela landing, pelo /blog/ e pelas páginas de cada autor.
export function imagemDoPost(d: { cardImage?: ImageMetadata; heroImage?: ImageMetadata; category: string; author: string }) {
  if (d.cardImage) return d.cardImage;
  if (d.heroImage) return d.heroImage;
  if (d.category === 'Games' && d.author === 'Fernando Fasolo Jr.') return imgFilho;
  return imagemDaCategoria[d.category] ?? imgTechPosts;
}
