export default function Footer() {
  return (
    <div className="border-t border-gray-300 text-center py-8 text-sm">
      Today in History Feed Powered by{' '}
      <a
        href="https://api.wikimedia.org/wiki/Main_Page"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-slate-500 hover:underline"
      >
        Wikimedia API
      </a>{' '}
      and{' '}
      <a
        href="https://developer.twitter.com/en/docs/twitter-api"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-slate-500 hover:underline"
      >
        Twitter API
      </a>
    </div>
  );
}
