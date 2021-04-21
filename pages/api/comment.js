import { nanoid } from 'nanoid'
import Redis from 'ioredis'

export default async function handler(req, res) {
  /* Comment Create */
  if (req.method === 'POST') {
    const { text, userToken, url } = req.body

    if (!url || !userToken || !text)
      return res.status(400).json({ message: 'Parametreler hatalı olabilir' })

    const userResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    const user = await userResponse.json()

    const comment = {
      id: nanoid(),
      createdAt: Date.now(),
      text,
      user: {
        name: user.name,
        picture: user.picture
      }
    }
    // Redis connection
    let redis = new Redis(process.env.REDIS_URL)
    // Redis write
    redis.lpush(url, JSON.stringify(comment))
    // Redis quit
    redis.quit()
    // Redis response
    res.status(200).json(comment)
  }

  /* Comment Fetch */
  if (req.method === 'GET') {
    const { url } = req?.query
    // Redis connection
    let redis = new Redis(process.env.REDIS_URL)
    // Redis write
    const comments = await redis.lrange(url, 0, -1)
    // Redis quit
    redis.quit()

    const data = comments.map((comment) => JSON.parse(comment))

    res.status(200).json(data)
  }
}
