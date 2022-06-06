export interface HistoryItem {
  text: string;
  year: number;
}

export function History(history: HistoryItem) {
  return (
    <div>
      <div className="font-bold">{history.text}</div>
      <div className="text-sm">{history.year}</div>
    </div>
  );
}
