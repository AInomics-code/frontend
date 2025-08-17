// Environment configuration
// For Vercel deployment, set VITE_API_URL environment variable in Vercel dashboard
// Example: VITE_API_URL=https://your-api-domain.com
export const ENV_CONFIG = {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
};
