import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'
import Form from '../../components/Form'
import Comments from '../../components/Comments'
import useComment from '../../hooks/useComment'

const PostPage = ({ post }) => {
  const [comments, onSubmit, text, setText] = useComment()

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
