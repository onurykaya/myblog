import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'
import { useAuth0 } from '@auth0/auth0-react'

const PostPage = ({ post }) => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()

  const content = useHydrate(post, {
    components: mdxComponents
  })

  return (
    <div className="site-container">
      <article>
        <h1 className="text-4xl font-bold mb-4">{post?.frontMatter?.title}</h1>
        <p>{post?.frontMatter?.excerpt}</p>
        <hr className="my-4" />
        <div className="prose">{content}</div>
      </article>
      <form className="mt-10">
        <textarea
          rows="2"
          className="border border-gray-300 rounded w-full block px-2 py-1"
        />
        <div className="mt-4">
          {!isAuthenticated ? (
            <button
              className="text-white bg-blue-600 px-2 py-1 rounded"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button className="text-white bg-blue-600 px-2 py-1 rounded">
                Send
              </button>
              <img
                src={user.picture}
                width={30}
                className="rounded-full"
                alt=""
              />
              <span>{user.name}</span>
              <button
                onClick={() =>
                  logout({ returnTo: process.env.NEXT_PUBLIC_URL + '/blog' })
                }
              >
                x
              </button>
            </div>
          )}
        </div>
      </form>
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
