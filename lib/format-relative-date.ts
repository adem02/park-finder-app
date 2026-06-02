export function formatRelativeDate(input: string | Date, now: Date = new Date()): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return '';

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);

  if (diffSec < 60) return "à l'instant";
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `il y a ${diffMin} min`;
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH} h`;
  const diffD = Math.round(diffH / 24);
  if (diffD < 7) return `il y a ${diffD} j`;
  const diffW = Math.round(diffD / 7);
  if (diffW < 5) return `il y a ${diffW} sem.`;
  const diffMo = Math.round(diffD / 30);
  if (diffMo < 12) return `il y a ${diffMo} mois`;
  const diffY = Math.round(diffD / 365);
  return `il y a ${diffY} an${diffY > 1 ? 's' : ''}`;
}
