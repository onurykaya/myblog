import { PrismAsync } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const Pre = ({ children, className }) => {
  const lang = className.split('-')[1]
  return (
    <PrismAsync language={lang} style={dracula}>
      {children}
    </PrismAsync>
  )
}

export default Pre
