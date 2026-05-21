import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'INSTAGRAM_ACCESS_TOKEN is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const url = new URL(req.url);
    const limit = url.searchParams.get('limit') ?? '12';

    const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
    const igUrl = `https://graph.instagram.com/me/media?fields=${fields}&limit=${encodeURIComponent(
      limit,
    )}&access_token=${encodeURIComponent(token)}`;

    const res = await fetch(igUrl);
    const data = await res.json();

    if (!res.ok) {
      console.error('Instagram API error:', data);
      return new Response(
        JSON.stringify({ error: 'Instagram API error', details: data }),
        { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (err) {
    console.error('instagram-feed error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
