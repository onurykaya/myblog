import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import Form from '../../components/Form'
import { DateTime } from 'luxon'
import Comments from '../../components/Comments'

const PostPage = ({ post }) => {
  const { getAccessTokenSilently } = useAuth0()
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [comments, setComments] = useState([])

  const fetchComment = async () => {
    const query = new URLSearchParams({ url })
    const newUrl = `/api/comment?${query.toString()}`
    const respose = await fetch(newUrl, {
      method: 'GET'
    })
    const data = await respose.json()
    setComments(data)
  }

  const content = useHydrate(post, {
    components: mdxComponents
  })

  useEffect(() => {
    if (!url) return
    fetchComment()
  }, [url])

  useEffect(() => {
    const url = window.location.origin + window.location.pathname
    if (url) setUrl(url)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const userToken = await getAccessTokenSilently()
    //text, user, url

    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ text, userToken, url }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    fetchComment()
    setText('')
  }

  return (
    <div className="site-container">
      <article>
        <h1 className="text-4xl font-bold mb-4">{post?.frontMatter?.title}</h1>
        <p>{post?.frontMatter?.excerpt}</p>
        <hr className="my-4" />
        <div className="prose">{content}</div>
      </article>
      <Form onSubmit={onSubmit} setText={setText} text={text} />
      <Comments comments={comments} />
    </div>
  )
}

export default PostPage

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths('post'),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const post = await getMdxNode('post', context)

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }
}
