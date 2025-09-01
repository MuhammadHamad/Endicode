import Papa from 'papaparse';

export interface CSVParseResult<T = any> {
  data: T[];
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}

export function parseCSV<T = any>(file: File): Promise<CSVParseResult<T>> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results as CSVParseResult<T>);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}

export function generateCSV<T extends Record<string, any>>(data: T[]): string {
  return Papa.unparse(data);
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export function deduplicateByEmail<T extends { email: string }>(data: T[]): T[] {
  const seen = new Set<string>();
  return data.filter(item => {
    const email = item.email.toLowerCase().trim();
    if (seen.has(email)) {
      return false;
    }
    seen.add(email);
    return true;
  });
}
