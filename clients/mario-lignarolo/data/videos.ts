/**
 * Videos (YouTube). Uno destacado + una lista corta curada (no más de 4).
 * Con `youtubeId` se usa la miniatura real de YouTube y se enlaza al video;
 * sin él se muestra una miniatura tipográfica. `sample: true` = de muestra.
 */
export type Video = {
  title: string;
  youtubeId: string | null;
  duration?: string;
  sample?: boolean;
};

export const videos: Video[] = [
  { title: "Cambiar quién eres para cambiar lo que construyes", youtubeId: null, sample: true },
  { title: "Autoconcepto", youtubeId: null, sample: true },
  { title: "Respiración consciente", youtubeId: null, sample: true },
  { title: "No negociables", youtubeId: null, sample: true },
];
