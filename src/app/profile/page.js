import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbconnection";

export default async function Profile() {
  const user = await currentUser();

  const userInfo = await db.query(`SELECT * FROM users WHERE userID = $1`, [
    user.id,
  ]);
  const uIw = userInfo.rows;
  return (
    <>
      <h1>profile page</h1>

      {uIw.map((item) => {
        return (
          <>
            <div key={item.id}>
              <p>{item.user_name}</p>
              <p>{item.bio}</p>
            </div>
          </>
        );
      })}
      <Link href="/editProfile">Edit profile</Link>
    </>
  );
}
