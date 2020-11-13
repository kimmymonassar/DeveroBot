import axios from 'axios';
import subreddits from '../../../assets/json/subreddits.json';

export default async function getPost(specificSub?: string): Promise<string> {
  const types = ['image', 'rich:video'];
  const subreddit = specificSub ? specificSub : subreddits[Math.floor(Math.random() * subreddits.length)];
  const { data } = await axios.get(`https://www.reddit.com/r/${subreddit}/hot.json?limit=100`);

  const posts = data.data.children.filter((post: any) => {
    if (post.data) {
      return types.includes(post.data.post_hint) && post.data.url && post.data.title;
    }
    return false;
  });

  const post = posts[Math.floor(Math.random() * posts.length)].data;
  return `**r/${subreddit}** [${post.title}](<https://www.reddit.com${post.permalink}>)\n${post.url}`;
}
