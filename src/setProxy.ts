// src/setupProxy.ts (TypeScript)
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:9090',
      changeOrigin: true,
    })
  );
}
