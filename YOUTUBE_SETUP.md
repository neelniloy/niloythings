# YouTube API Setup

To fetch real videos from your YouTube channel, you need to set up a YouTube API key:

## Steps:

1. **Get a YouTube Data API v3 Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (or select existing)
   - Enable "YouTube Data API v3"
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Copy the API key

2. **Add the API key to your project:**
   - Create a `.env.local` file in the project root
   - Add: `NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here`
   - Restart the dev server

3. **The component will automatically:**
   - Fetch your 3 latest videos
   - Display real thumbnails
   - Show actual titles and publish dates
   - Link directly to each video

## Fallback:
If no API key is provided, the component shows placeholder videos with links to your channel.
