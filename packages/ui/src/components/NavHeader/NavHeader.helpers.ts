import { resolveZoneHref } from '../../providers';

/**
 * Checks whether a given URL is external (protocol-relative, mailto, tel, or http(s)).
 */
export function isExternalUrl(url?: string): boolean {
  if (!url) return false;
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('//') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:')
  );
}

/**
 * Determines whether navigation requires cross-zone hard link behavior.
 */
export function isCrossZoneNavigation(
  zone?: string,
  currentZone?: string,
  explicitCrossZone?: boolean
): boolean {
  if (explicitCrossZone) return true;
  if (!zone) return false;
  if (!currentZone) return true;
  return zone !== currentZone;
}

/**
 * Resolves the destination URL taking into account zone configuration.
 */
export function resolveNavDestination(
  href?: string,
  zone?: string,
  zones?: Record<string, string>
): string | undefined {
  if (!href) return undefined;
  return resolveZoneHref(href, zone, zones);
}
