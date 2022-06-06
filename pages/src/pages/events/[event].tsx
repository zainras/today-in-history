import { Splide, SplideSlide } from '@splidejs/react-splide';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Feed, FeedItem } from '@/components/Feed';
import { Loading } from '@/components/Loading';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export interface Props {
  histories: {
    selected: Array<FeedItem>;
    births: Array<FeedItem>;
    deaths: Array<FeedItem>;
    holiday: Array<FeedItem>;
  };
}

export default function EventType() {
  const router = useRouter();
  const { event } = router.query;
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const { data } = useSWR(
    `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/${event}/${month}/${day}?limit=5`,
    fetcher
  );

  if (!data) return <Loading />;

  let histories = data[event].slice(0, 15);
  histories = histories.filter(
    (feed: FeedItem) => feed.pages[0] && feed.pages[0].originalimage
  );
  // }
  return (
    <>
      <div className="antialiased w-full text-gray-700 bg-slate-900">
        <div className="aspect-[9/16] max-h-screen mx-auto">
          <div className="relative">
            <div className="absolute z-20">
              <div className="bg-slate-600/50 p-2 rounded-br-lg">
                <Link href="/">
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 17l-5-5m0 0l5-5m-5 5h12"
                      />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            <div className="absolute z-20 right-0 text-right">
              <div className="bg-red-400 p-2 rounded-bl-lg">
                <span className="text-xs text-slate-100">TODAY IN HISTORY</span>{' '}
                <span>|</span>{' '}
                <span className="text-xs text-slate-100">{today}</span>
              </div>
            </div>
          </div>
          <Splide
            options={{
              rewind: true,
              autoplay: true,
              interval: 5000,
              lazyLoad: true,
            }}
          >
            {histories.map((feed, idx) => (
              <SplideSlide key={idx}>
                <Feed {...feed} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </>
  );
}
