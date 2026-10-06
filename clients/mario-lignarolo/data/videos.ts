/**
 * Videos (YouTube @mariolignarolo). Uno destacado + tres curados.
 * Datos reales del canal (id y título). Con `youtubeId` se usa la miniatura
 * real y se enlaza al video.
 */
export type Video = {
  title: string;
  youtubeId: string | null;
  duration?: string;
  sample?: boolean;
};

export const videos: Video[] = [
  { title: "Haz esto por 40 días para ser irreconocible", youtubeId: "gZ5VfirI-Fs" },
  { title: "Cómo ser tan atractivo para que la realidad te persiga", youtubeId: "wSEMgi6puZo" },
  { title: "El verdadero reto es ignorar tu realidad", youtubeId: "VdQ770YhriQ" },
  { title: "Para ser fit físicamente, primero necesitas ser fit mentalmente", youtubeId: "nKX1_RJirM4" },
];
