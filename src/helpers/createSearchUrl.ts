export function createUrlForSearch(valueOfInput: string): string {
  const apiUrl = `https://newsapi.org/v2/everything?q=${valueOfInput}&sources=bbc-news&searchIn=title&from=2023-03-20&sortBy=popularity&apiKey=f5110220c7f6448d84d3250bb882da25`;
  return apiUrl;
}

export function createUrlForEverything(): string {
  const apiUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f5110220c7f6448d84d3250bb882da25`;
  return apiUrl;
}

//api has request limit, so change apiKey (check tests)
// const apiUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f5110220c7f6448d84d3250bb882da25`;
// const apiUrl = `https://newsapi.org/v2/everything?q=${valueOfInput}&searchIn=title&from=2023-04-05&sortBy=popularity&apiKey=f5110220c7f6448d84d3250bb882da25`;

// const apiUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=72c344688e5a4f68a604b77a5d247d3e`;
// const apiUrl = `https://newsapi.org/v2/everything?q=${valueOfInput}&searchIn=title&from=2023-04-05&sortBy=popularity&apiKey=72c344688e5a4f68a604b77a5d247d3e`;
