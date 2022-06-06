import useSWR from 'swr';

import Footer from '@/components/Footer';
import { Loading } from '@/components/Loading';
import { Stories } from '@/components/Stories';
import { TweetCard } from '@/components/TweetCard';

export default function Index() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(process.env.WORKER_URL, fetcher);

  if (!data) return <Loading />;

  const tweetData = data.data;
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
        <div className="relative mt-8 border-t border-slate-200">
          {tweets.map((tweet: any, index: any, i: any) => (
            <TweetCard key={tweet.id} index={index} tes={i} {...tweet} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
