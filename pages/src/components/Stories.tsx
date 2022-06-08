import Link from 'next/link';

import StoryIcon from './StoryIcon';

export const events = [
  {
    title: 'On This Day',
    feedTitle: 'Today In History',
    schema: 'selected',
    style: 'bg-gradient-to-tr from-yellow-400 to-purple-600',
  },
  {
    title: 'Births',
    feedTitle: 'Births On This Day',
    schema: 'births',
    img: '/icons/birth.svg',
    style: 'bg-gradient-to-tr from-blue-400 to-green-600',
  },
  {
    title: 'Deaths',
    feedTitle: 'Deaths On This Day',
    schema: 'deaths',
    img: '/icons/death.svg',
    style: 'bg-gradient-to-tr from-red-400 to-pink-600',
  },
  {
    title: 'Holiday',
    feedTitle: 'Holiday On This Day',
    schema: 'holidays',
    img: '/icons/holiday.svg',
    style: 'bg-gradient-to-tr from-orange-400 to-yellow-600',
  },
];
export function Stories() {
  return (
    <ul className="flex justify-center space-x-6">
      {events.map((event: any, idx: number) => (
        <li key={event.title} className="flex flex-col items-center space-y-1 ">
          <div className={`${event.style} p-1 rounded-full`}>
            <Link href="/events/[event]" as={`/events/${event.schema}`}>
              <a
                href="#"
                className="block bg-white p-1 rounded-full transform transition hover:-rotate-6"
              >
                <StoryIcon isDate={idx === 0} icon={event.img} />
              </a>
            </Link>
          </div>

          <span className="text-sm text-center">{event.title}</span>
        </li>
      ))}
    </ul>
  );
}
