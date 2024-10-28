import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function users({ params }) {
  const myparams = await params;
  const userInfo = await db.query(`SELECT * FROM users WHERE user_name = $1`, [
    myparams.name,
  ]);
  const uIw = userInfo.rows;

  const userposts = await db.query(
    `SELECT *FROM week_9_POSTS WHERE name = $1`,
    [myparams.name]
  );
  const up = userposts.rows;

  return (
    <>
      <h1>profile</h1>

      {uIw.map((item) => {
        return (
          <>
            <div
              className=" flex flex-col justify-center align-middle text-center bg-slate-800 rounded-xl"
              key={item.id}
            >
              <p className="m-3 bg-slate-900 rounded-xl p-3">user name:</p>
              <p className="text-purple-300">{item.user_name}</p>
              <p className="m-3  bg-slate-900 rounded-xl p-3">user bio:</p>
              <p className="text-cyan-200">{item.bio}</p>
              <div className="flex justify-center">
                <form
                  className="m-6 bg-green-600 p-3 rounded-xl"
                  action={async function follow() {
                    "use server";
                    const user = await currentUser();
                    const otherUser = item.userid;
                    const LIuser = user.id;
                    const erIng = LIuser + otherUser;

                    await db.query(
                      `INSERT INTO follow (er_ing, following, follow, follower_fkey) VALUES ($1,$2,'yes',$3) ON CONFLICT (er_ing) DO UPDATE SET follow = EXCLUDED.follow;`,
                      [erIng, otherUser, LIuser]
                    );

                    revalidatePath(`/users/${myparams.name}`);
                  }}
                >
                  <button type="submit">follow</button>
                </form>
                <form
                  className="m-6  bg-red-600 p-3 rounded-xl"
                  action={async function unfollow() {
                    "use server";
                    const user = await currentUser();
                    const otherUser = item.userid;
                    const LIuser = user.id;
                    const erIng = LIuser + otherUser;
                    await db.query(
                      `INSERT INTO follow (er_ing, following, follow, follower_fkey) VALUES ($1,$2,'no',$3) ON CONFLICT (er_ing) DO UPDATE SET follow = EXCLUDED.follow;`,
                      [erIng, otherUser, LIuser]
                    );

                    revalidatePath(`/users/${myparams.name}`);
                  }}
                >
                  <button type="submit">unfollow</button>
                </form>
              </div>
              {up.map((item2) => {
                return (
                  <div className="m-6" key={item2.id}>
                    <p className="m-3  bg-slate-900 rounded-xl p-3">posts</p>
                    <p className="m-3 text-red-900 bg-slate-500 rounded-xl p-3">
                      {item2.post}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );
}
