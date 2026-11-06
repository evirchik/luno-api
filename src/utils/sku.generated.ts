const translitMap: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

function translit(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((char) => translitMap[char] ?? char)
    .join('');
}

interface SkuData {
  brandName: string;
  categoryName: string;
  productName: string;
}

export function generateSku({
  brandName,
  categoryName,
  productName,
}: SkuData): string {
  const rawString = `${brandName}-${categoryName}-${productName}`;

  const transliterated = translit(rawString);

  return transliterated
    .toUpperCase()
    .trim()
    .replace(/[^A-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
