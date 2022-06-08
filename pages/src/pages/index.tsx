import useSWR from 'swr';

import Footer from '@/components/Footer';
import { Loading } from '@/components/Loading';
import { Stories } from '@/components/Stories';
import { TweetCard } from '@/components/TweetCard';
import fetcher from '@/utils/Fetcher';

export default function Index() {
  const { data } = useSWR(process.env.WORKER_URL, fetcher);

  if (!data) return <Loading />;

  // @ts-ignore // TODO: fix this type error
  const tweetData = data.data;
  // @ts-ignore // TODO: fix this type error
  const { users } = data.includes;
  const tweets = tweetData.flatMap(
    (tweet: { author_id: string; id: any; text: any; created_at: any }) => {
      const user = users.find((u: { id: string }) => u.id === tweet.author_id);
      if (!user) {
        // eslint-disable-next-line no-console
        console.log('invalid user', { tweet });
        return [];
      }

      return {
        id: tweet.id,
        name: user.name,
        avatarUrl: user.profile_image_url,
        username: user.username,
        text: tweet.text,
        timestamp: tweet.created_at,
      };
    }
  );

  return (
    <div className="antialiased w-full">
      <div className="max-w-screen-sm border-x mx-auto pt-16">
        <div className="font-bold text-3xl text-gray-900 text-center">
          #TodayInHistory
        </div>
        <div className="text-center">Your daily feed Today in History</div>
        <div className="mt-8">
          <Stories />
        </div>
        <div className="relative mt-8 ">
          <div className="flex flex-row py-3 pl-3 bg-slate-100">
            <img src="/icons/twitter.svg" alt="" width={30} />
            Twitter timeline #TodayInHistory
          </div>
          <div className="border-t border-slate-200">
            {tweets.map((tweet: any, index: any, i: any) => (
              <TweetCard key={tweet.id} index={index} tes={i} {...tweet} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
