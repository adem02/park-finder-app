const fmt = (n: number, singular: string, plural: string): string =>
  `il y a ${n} ${n > 1 ? plural : singular}`;

export function timeAgo(input: Date | string): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  const diffSec = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));

  if (diffSec < 45) return "à l'instant";
  if (diffSec < 90) return 'il y a 1 minute';

  const min = Math.round(diffSec / 60);
  if (min < 60) return fmt(min, 'minute', 'minutes');

  const hr = Math.round(min / 60);
  if (hr < 24) return fmt(hr, 'heure', 'heures');

  const day = Math.round(hr / 24);
  if (day < 30) return day === 1 ? 'hier' : fmt(day, 'jour', 'jours');

  const mo = Math.round(day / 30);
  if (mo < 12) return fmt(mo, 'mois', 'mois');

  const yr = Math.round(mo / 12);
  return fmt(yr, 'an', 'ans');
}
