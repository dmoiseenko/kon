import { useRouter } from "next/router"
import { useUser } from "@auth0/nextjs-auth0"
import Link from "next/link"

export default function Header() {
  const { pathname } = useRouter()
  const { user, error, isLoading } = useUser()

  return (
    <header>
      <Link href="/">
        <a className={pathname === "/" ? "is-active" : ""}>Home</a>
      </Link>
      <Link href="/about">
        <a className={pathname === "/about" ? "is-active" : ""}>About</a>
      </Link>
      {user ? (
        <Link href="/api/auth/logout">
          <a>
            Logout
          </a>
        </Link>
      ) : (
        <Link href="/api/auth/login">
          <a>
            Login
          </a>
        </Link>
      )}

      <style jsx>{`
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  )
}
