import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function PUT(request: NextRequest) {

  // In the edge runtime you can use Bindings that are available in your application
  // (for more details see:
  //    - https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#use-bindings-in-your-nextjs-application
  //    - https://developers.cloudflare.com/pages/functions/bindings/
  // )
  //
  // KV Example:
  const body = await request.clone().text();
  const parsedBody = JSON.parse(body);
  const { key, value } = parsedBody;
  console.log(key);
  console.log(value);
  const myKv = getRequestContext().env._0421_LINEDC_HACK;

  await myKv.put(key, value)
  // const suffix = await myKv.get('suffix')
  // responseText += suffix

  return new Response(`The value of kvTest in MY_KV is: ${key}`)
}
