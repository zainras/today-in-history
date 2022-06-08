type APIQuery = Record<string, number | string | Array<number | string>>;
type TwitterResponse = Record<string, unknown>;

const queryString = (query: APIQuery) =>  {
  return Object.entries(query)
  .map(([k, v]) => {
    if (Array.isArray(v)) {
      return `${k}=${v.join(",")}`;
    }
    return `${k}=${v}`;
  })
  .join("&");
}

const respond = (request: any, response: Record<string, unknown>, code?: number) => {
  const url = new URL(request.url);

  const res = new Response(JSON.stringify(response), {
    headers: { 'content-type': 'application/json' },
    status: code,
  })
  // Set CORS headers
  console.log(url.origin);
  
  res.headers.set('Access-Control-Allow-Origin', PAGES_URL);

  // Append to/Add Vary header so browser will cache response correctly
  res.headers.append('Vary', 'Origin');

  return res;
}

const handleRequest = async (request: Request) => {
  const baseQuery = {
    query: '%23TodayInHistory lang:en',
    max_results: 15,
    expansions: "author_id",
    "tweet.fields": ["id", "text", "created_at"],
    "user.fields": ["username", "name", "profile_image_url"],
  };
  
  const query = queryString(baseQuery);

  const response = await fetch( `https://api.twitter.com/2/tweets/search/recent?` + query, {
    cf: {
      cacheTtl: 15 * 60,// Always cache this fetch for a max of 15 minutes before revalidating the resource
      cacheEverything: true,
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
    }
  });
  
  const data: TwitterResponse = await response.json()
  return respond(request, data)
}

export default handleRequest;