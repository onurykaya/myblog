import { getAllNodes } from 'next-mdx/server'
import Link from 'next/link'

const BlogPage = ({ posts }) => {
  return (
    <div className="site-container">
      <div className="space-y-4">
        {posts?.map((post) => {
          return (
            <article key={post?.url}>
              <Link href={post?.url}>
                <h2 className="text-xl font-bold">
                  {post?.frontMatter?.title}
                </h2>
              </Link>
              <p>{post?.frontMatter?.excerpt}</p>
              <div className="text-gray-400">
                <span>{post?.frontMatter?.date}</span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default BlogPage

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes('post')
    }
  }
}
