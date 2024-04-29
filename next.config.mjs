/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      { source: '/', destination: '/question/entry', permanent: true}
    ];
  }
};

export default nextConfig;
