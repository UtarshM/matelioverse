import { Product } from '@/types';
import { CURATED_PRODUCTS } from './curatedProducts';
import scrapedMaterialsRaw from './scraped_products.json';

export { CURATED_PRODUCTS };
export const SCRAPED_PRODUCTS: Product[] = scrapedMaterialsRaw as unknown as Product[];

export const PRODUCTS: Product[] = [
  ...CURATED_PRODUCTS,
  ...SCRAPED_PRODUCTS,
];
