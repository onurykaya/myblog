import { useAuth0 } from '@auth0/auth0-react'

const Form = ({ onSubmit, setText, text }) => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()
  return (
    <form onSubmit={onSubmit} className="mt-10">
      <textarea
        value={text}
        rows="2"
        className="border border-gray-300 rounded w-full block px-2 py-1"
        onChange={(e) => setText(e.target.value)}
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
  )
}

export default Form
