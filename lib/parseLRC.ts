// type ParsedLine = {
//   time: number;
//   text: string;
// };

// const parseLRC = (lrc: string): ParsedLine[] => {
//   if (!lrc.trim()) return [];

//   const lines = lrc.split('\n');
//   const result: ParsedLine[] = [];

//   const timeRegex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/;

//   for (const line of lines) {
//     const match = line.match(timeRegex);
//     if (match) {
//       const minutes = parseInt(match[1], 10);
//       const seconds = parseInt(match[2], 10);
//       const milliseconds = match[3] ? parseInt(match[3].padEnd(3, '0'), 10) : 0;
//       const time = minutes * 60 + seconds + milliseconds / 1000;
//       const text = line.replace(timeRegex, '').trim();
//       result.push({ time, text });
//     }
//   }

//   return result.sort((a, b) => a.time - b.time);
// };
