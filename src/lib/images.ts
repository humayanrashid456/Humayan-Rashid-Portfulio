/**
 * Built-in site images (the files in public/images). `npm run images:migrate` uploads
 * them to Cloudinary under SITE_IMAGE_FOLDER, keeping each file name as its public id.
 * Once NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set they are served from Cloudinary;
 * until then the local copies are used, so the site works before the upload.
 */
export const SITE_IMAGE_FOLDER = "portfolio/site";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function siteImage(file: string): string {
  return CLOUD_NAME
    ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${SITE_IMAGE_FOLDER}/${file}`
    : `/images/${file}`;
}
