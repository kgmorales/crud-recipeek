const path = require('path');


const { composePlugins, withNx } = require('@nx/next');
const plugins = [withNx];

const nextConfig = {
  nx: { svgr: true },
  sassOptions: { includePaths: [path.join(__dirname, 'styles')] },
  images: { domains: ['http://uploads.paprikaapp.com.s3.amazonaws.com/'] },

  //* Warning: This allows production builds to successfully complete even if
  eslint: { ignoreDuringBuilds: true },
};

module.exports = composePlugins(...plugins)(nextConfig);
