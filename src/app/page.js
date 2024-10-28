import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  const followers = await db.query(
    `SELECT * FROM follow WHERE follower_fkey = $1 AND follow = TRUE`,
    [user.id]
  );
  const fw = followers.rows;
  const fno = fw.length;

  if (fno <= 0) {
    const sugg = await db.query(
      `SELECT * FROM users ORDER BY RANDOM() LIMIT 5`
    );
    const sw = sugg.rows;
    return (
      <>
        <h1 className="m-4">follow some people to see their posts</h1>
        <h2>suggestions</h2>
        <h2>list of profile suggestions pulled from users table</h2>
        {sw.map((item1) => {
          return (
            <div key={item1.id}>
              <p className="m-5">
                <Link
                  className="bg-blue-800 p-2  border-lime-50 border-2 rounded-xl m-4"
                  href={`/users/${item1.user_name}`}
                >
                  {item1.user_name}
                </Link>
              </p>
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <h1 className="m-4">following</h1>

        {fw.map((item) => {
          return (
            <div key={item.id}>
              <p className="m-5 bg-slate-800 p-5 rounded-xl text-purple-200">
                <p className="bg-blue-800 p-2  border-lime-50 border-2 rounded-xl m-3">
                  {item.following}:
                </p>
              </p>
            </div>
          );
        })}
      </>
    );
  }
}
