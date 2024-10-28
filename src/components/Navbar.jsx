import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <Link className="nav" href="/">
        following
      </Link>
      <Link className="nav" href="/usersPosts">
        users posts
      </Link>
      <Link className="nav" href="/publicFeed">
        public feed
      </Link>
      <Link className="nav" href="/profile">
        profile
      </Link>
    </>
  );
}
