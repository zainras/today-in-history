export interface PageProps {
  title: string;
  originalimage: {
    source: string;
    width: number;
    height: number;
  };
}

export interface FeedItem {
  text: string;
  year: number;
  pages: Array<PageProps>;
}

export function Feed(feed: FeedItem) {
  const { pages } = feed;
  const page = pages[0];
  return (
    <div>
      <div>
        {page && page.originalimage && (
          <div
            style={{
              height: '100vh',
              backgroundImage: `url(${page.originalimage.source})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute bottom-0 w-full pb-5">
              <div className="absolute bg-gray-700 w-full h-full blur-xl"></div>
              <div className="absolute bg-gray-900/80 w-full h-full"></div>
              <div className="relative p-6">
                <p className=" font-brand font-bold text-white z-10 m-0">
                  {feed.year}
                </p>
                <span className="text-slate-50 m-0">{feed.text}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
