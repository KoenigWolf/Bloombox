const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'pad' | 'scale' | 'thumb';
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpg';
  gravity?: 'auto' | 'face' | 'center';
}

export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  const {
    width,
    height,
    crop = 'limit',
    quality = 'auto',
    format = 'auto',
    gravity,
  } = options;

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (gravity) transformations.push(`g_${gravity}`);

  transformations.push('dpr_auto');

  const params = transformations.join(',');

  return `${CLOUDINARY_BASE}/${params}/${publicId}`;
}

export function getBlurDataUrl(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 10,
    quality: 30,
    format: 'webp',
  });
}

export function getPlaceholderUrl(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 100,
    quality: 50,
    format: 'webp',
  });
}
