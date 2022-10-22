import { parseCookies } from '$lib/api';
import type { RequestEvent, ResolveOptions } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';

interface HandlerArguments {
  event: RequestEvent;
  resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>;
}

export async function handle({ event, resolve }: HandlerArguments) {
  const url = event.url.pathname;
  const isLoggedIn = parseCookies(event.request.headers.get('cookie') || '', 'sessionid') || false;

  if (isLoggedIn) {
    if (!url.includes("/dashboard")) {
      event.url.pathname = '/dashboard';
      return Response.redirect(event.url);
    }
  } else {
    if (!url.includes("auth/") && url.includes("dashboard/")) {
      event.url.pathname = '/';
      return Response.redirect(event.url);
    }
  }

  const response = await resolve(event);
  return response;
}

