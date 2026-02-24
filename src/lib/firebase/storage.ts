'use client';

/**
 * Character (and item) images: URL-only, no Firebase Storage.
 *
 * Firebase Storage is not used (avoids paid plan). Store any public image URL
 * in character.media.url or item.imageUrl (e.g. from Imgur, imgbb, Discord
 * CDN, or any host). When editing a character, paste the image link there.
 */

export const IMAGE_NOTE =
  'Images use external URLs only. Paste a link from Imgur, imgbb, or any public image host.';
