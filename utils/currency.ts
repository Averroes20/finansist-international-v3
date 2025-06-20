/**
 * Format angka ke dalam format mata uang, sudah termasuk simbol di awal (Rp, $).
 * @param amount Angka yang akan diformat.
 * @param currency Kode mata uang (contoh: "IDR", "USD").
 * @param locale Locale format (contoh: "id-ID", "en-US"). Default "id-ID".
 * @returns String format mata uang dengan simbol.
 */
export function formatCurrency(
  amount: number | string,
  currency: string,
  locale: string = 'id-ID'
): string {
  let num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    num = 0;
  }

  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: locale === 'id-ID' ? 0 : 2,
    maximumFractionDigits: locale === 'id-ID' ? 0 : 2,
  }).format(num);

  return formatted;
}
