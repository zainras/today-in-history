export interface TweetItem {
  id: string;
  avatarUrl: string;
  username: string;
  name: string;
  text: string;
  timestamp: number;
}
const timeFormat = new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: 'numeric',
});
const dateFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function TweetCard(tweet: TweetItem) {
  const date = new Date(tweet.timestamp);
  return (
    <div className="p-4 border-b border-slate-200">
      <div className="flex flex-row items-center">
        <img
          src={tweet.avatarUrl}
          className="rounded-full mr-2 w-10 h-10"
          alt=""
        />
        <div className="flex flex-col leading-5">
          <strong>{tweet.name}</strong>
          <span className="text-slate-500">@{tweet.username}</span>
        </div>
      </div>
      <p className="text-lg py-3">{tweet.text}</p>
      <a
        href={`https://twitter.com/${tweet.username}/statuses/${tweet.id}`}
        className="text-sm text-slate-500 hover:underline"
      >
        <time dateTime={date.toDateString()} className="flex flex-row">
          <span>{timeFormat.format(date)}</span>
          <span>&nbsp;·&nbsp;</span>
          <span>{dateFormat.format(date)}</span>
        </time>
      </a>
    </div>
  );
}
