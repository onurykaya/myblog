import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function () {
  const { getAccessTokenSilently } = useAuth0()
  const [url, setUrl] = useState('')
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  const fetchComment = async () => {
    const query = new URLSearchParams({ url })
    const newUrl = `/api/comment?${query.toString()}`
    const response = await fetch(newUrl, {
      method: 'GET'
    })
    const data = await response.json()
    setComments(data)
  }

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

  return [comments, onSubmit, text, setText]
}
