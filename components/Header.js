import Link from 'next/link'

const Header = () => {
  return (
    <header className="site-container py-6">
      <nav className="space-x-4">
        <Link href="/">
          <a href="">Hakkımda</a>
        </Link>
        <Link href="/blog">
          <a href="">Yazılar</a>
        </Link>
      </nav>
    </header>
  )
}

export default Header
