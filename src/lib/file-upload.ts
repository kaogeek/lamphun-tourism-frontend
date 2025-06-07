export function resolveUrl(pathUrl: string): string {
  const basePath = import.meta.env.VITE_API_BASE_ENDPOINT;

  if (!basePath) {
    throw new Error('VITE_API_BASE_ENDPOINT is not defined');
  }

  return new URL(pathUrl, basePath).href;
}
