export const onRequestPost = async ({ request, env }) => {
  const body = await request.clone().text();
  const parsedBody = JSON.parse(body);
  const { key, value } = parsedBody;

  await env._0421_LINEDC_HACK.put(key, value); // Cloudflare KVへ書き込み

  return new Response();
};