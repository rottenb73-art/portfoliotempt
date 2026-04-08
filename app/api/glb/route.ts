import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    responseLimit: '500mb',
  },
};

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('Missing url param', { status: 400 });

  if (!url.startsWith('https://raw.githubusercontent.com/rottenb73-art/')) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'portfolio-proxy/1.0' },
    });
    if (!res.ok) return new NextResponse(`Upstream ${res.status}`, { status: res.status });

    // Stream the response rather than buffering the whole file in memory
    return new NextResponse(res.body, {
      headers: {
        'Content-Type': 'model/gltf-binary',
        'Content-Length': res.headers.get('content-length') ?? '',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    console.error('GLB proxy error:', e);
    return new NextResponse('Fetch failed', { status: 502 });
  }
}
