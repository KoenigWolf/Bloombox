import type { ImageLoaderProps } from 'next/image';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

interface CloudinaryLoaderProps extends ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: CloudinaryLoaderProps): string {
  const params = [
    `w_${width}`,
    `q_${quality || 'auto'}`,
    'f_auto', // WebP/AVIF自動変換
    'c_limit', // アスペクト比を維持
    'dpr_auto', // デバイスピクセル比を自動検出
  ].join(',');

  // srcがフルURLの場合はfetch modeを使用
  if (src.startsWith('http://') || src.startsWith('https://')) {
    const encodedUrl = encodeURIComponent(src);
    return `${CLOUDINARY_BASE}/${params}/fetch/${encodedUrl}`;
  }

  // 開発環境で、かつローカルパス（/から始まる）場合はそのまま返す
  if (process.env.NODE_ENV === 'development' && src.startsWith('/')) {
    return src;
  }
  if (src.startsWith('http://') || src.startsWith('https://')) {
    const encodedUrl = encodeURIComponent(src);
    return `${CLOUDINARY_BASE}/${params}/fetch/${encodedUrl}`;
  }

  // srcがCloudinaryのpublic_idの場合
  return `${CLOUDINARY_BASE}/${params}/${src}`;
}
