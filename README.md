This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open a new terminal and run the proxy server:
```bash
npm run proxy
# or
yarn proxy
# or
pnpm proxy
# or
bun proxy
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prerequisities

Authenticate with the test Flexpa API server:
1. Register to the portal: https://portal.flexpa.com/
2. Retrieve a set of test API keys via the portal
3. Load your test API keys into a new file called `.env.local`:
```bash
NEXT_PUBLIC_PUBLISHABLE_KEY=your-publishable-key
SECRET_KEY=your-secret-key
```
4. Create two env variables for access to the Flexpa API in this same file `.env.local`:
```bash
NEXT_PUBLIC_FLEXPA_PUBLIC_API_BASE_URL=https://api.flexpa.com
FLEXPA_PUBLIC_API_BASE_URL=https://api.flexpa.com
```