import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '36', 10);
  const category = searchParams.get('category') || 'all';
  const brand = searchParams.get('brand') || 'all';
  const sla = searchParams.get('sla') || 'all';
  const pvtOnly = searchParams.get('pvt') === 'true';
  const query = (searchParams.get('q') || '').trim().toLowerCase();

  let filtered = PRODUCTS;

  if (category !== 'all') {
    filtered = filtered.filter((p) => p.categorySlug === category);
  }
  if (brand !== 'all') {
    const normBrand = brand.toLowerCase();
    filtered = filtered.filter((p) => {
      const productBrand = p.brand.toLowerCase();
      return productBrand.includes(normBrand) || normBrand.includes(productBrand);
    });
  }
  if (sla !== 'all') {
    filtered = filtered.filter((p) => p.slaType === sla);
  }
  if (pvtOnly) {
    filtered = filtered.filter((p) => p.isPrivateLabel);
  }
  if (query) {
    filtered = filtered.filter((p) => {
      const matchName = p.name.toLowerCase().includes(query);
      const matchBrand = p.brand.toLowerCase().includes(query);
      const matchCat = p.category.toLowerCase().includes(query);
      const matchSub = p.subCategory ? p.subCategory.toLowerCase().includes(query) : false;
      const matchDesc = p.description.toLowerCase().includes(query);
      return matchName || matchBrand || matchCat || matchSub || matchDesc;
    });
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json(
    {
      products: paginated,
      total,
      totalPages,
      page: safePage,
      limit,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
