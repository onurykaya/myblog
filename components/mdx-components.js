import Pre from './Pre'

export const mdxComponents = {
  //Header gibi componentleri çağırıp mdx formatında yazdığımız blog yazılarına ekleyebiliriz.
  pre: ({ children }) => {
    return <Pre {...children.props} />
  }
}
