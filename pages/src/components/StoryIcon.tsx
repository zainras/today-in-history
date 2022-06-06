interface Icon {
  isDate: boolean;
  icon: string;
}
export default function StoryIcon(prop: Icon) {
  const { icon, isDate } = prop;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const monthFormat = new Intl.DateTimeFormat('en', {
    month: 'short',
  });
  const dayFormat = new Intl.DateTimeFormat('en', {
    day: '2-digit',
  });
  if (isDate) {
    return (
      <div className="relative w-16 h-16 p-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col text-center">
            <span className="font-bold uppercase">
              {monthFormat.format(today)}
            </span>
            <div></div>
            <span className="font-bold tracking-widest">
              {dayFormat.format(today)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return <img className="w-16 h-16 p-2" src={icon} alt="" />;
}
