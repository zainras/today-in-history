import Link from 'next/link';

import StoryIcon from './StoryIcon';

export function Stories() {
  const events = [
    {
      title: 'On This Day',
      link: '/events/selected',
    },
    {
      title: 'Births',
      link: '/events/births',
      img: '/icons/birth.svg',
    },
    {
      title: 'Deaths',
      link: '/events/deaths',
      img: '/icons/death.svg',
    },
    {
      title: 'Holiday',
      link: '/events/holiday',
      img: '/icons/holiday.svg',
    },
  ];

  return (
    <ul className="flex justify-center space-x-6">
      {events.map((event: any, idx: number) => (
        <li key={event.title} className="flex flex-col items-center space-y-1 ">
          <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
            <Link href="/events/[event]" as={event.link}>
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
