
/**
 * Format a date string to a locale-specific representation
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-LB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date and time string to a locale-specific representation
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-LB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Generate a placeholder QR code string (in a real app this would create an actual QR code)
 */
export function generateQRCode(data: string): string {
  return `qr_${btoa(data)}_${Date.now()}`;
}
