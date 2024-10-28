// this tests page will be for my use only to experiment with things before implementation

import { db } from "@/utils/dbconnection";
import { revalidatePath } from "next/cache";

export default async function Test() {
  // user number count can use this for likes dislikes and comments as  well as maybe follower count
  const gather = await db.query(`SELECT * FROM users`);
  const gw = gather.rows;
  // number of likes
  const likes = await db.query(`SELECT * FROM likes WHERE postlikes = TRUE`);
  const ln = likes.rows;
  // number of dislikes
  const dislikes = await db.query(
    `SELECT * FROM likes WHERE postlikes = FALSE`
  );
  const dn = dislikes.rows;
  //   user value will be the clerk user ID using auth()
  const user = `dave`;

  // this will be the user id from another user
  const otherUser = `bob`;

  const erIng = user + otherUser;

  // console.log(gw);
  const userNo = gw.length;
  const likesNo = ln.length;
  const dislikesNo = dn.length;

  //   this update may come in handy for the user profile editing but with different column names etc.
  async function like() {
    "use server";
    await db.query(
      `INSERT INTO likes (user_name,likes,dislikes) VALUES ($1,'yes','no') ON CONFLICT (user_name) DO UPDATE SET likes = EXCLUDED.likes, dislikes = EXCLUDED.dislikes;`,
      [user]
    );

    revalidatePath("/test");
  }

  async function dislike() {
    "use server";
    await db.query(
      `INSERT INTO likes (user_name,likes,dislikes) VALUES ($1,'NO','YES') ON CONFLICT (user_name) DO UPDATE SET likes = EXCLUDED.likes, dislikes = EXCLUDED.dislikes;`,
      [user]
    );

    revalidatePath("/test");
  }

  async function follow() {
    "use server";
    await db.query(
      `INSERT INTO follow (er_ing, following, follow, follower_fkey) VALUES ($1,$2,'yes',$3) ON CONFLICT (er_ing) DO UPDATE SET follow = EXCLUDED.follow;`,
      [erIng, otherUser, user]
    );

    revalidatePath("/test");
  }

  async function unfollow() {
    "use server";
    await db.query(
      `INSERT INTO follow (er_ing, following, follow, follower_fkey) VALUES ($1,$2,'no',$3) ON CONFLICT (er_ing) DO UPDATE SET follow = EXCLUDED.follow;`,
      [erIng, otherUser, user]
    );

    revalidatePath("/test");
  }

  return (
    <>
      <h1>test stuff</h1>
      <h2>number of users: {userNo}</h2>
      <h2>this will come in handy for likes and follower numbers</h2>

      <form action={like}>
        <button type="submit">like</button>
      </form>
      <p>number of likes: {likesNo}</p>
      <form action={dislike}>
        <button type="submit">dislike</button>
      </form>
      <p>number of dislikes: {dislikesNo}</p>

      {/* i need to find a way of only rendering which button is not active, if following only show unfollow and vice versa */}
      <p> would you like to follow {otherUser}?</p>
      <form action={follow}>
        <button type="submit">follow</button>
      </form>
      <form action={unfollow}>
        <button type="submit">unfollow</button>
      </form>
    </>
  );
}

// remember WHERE condition1 = value1 AND condition2 = value2
