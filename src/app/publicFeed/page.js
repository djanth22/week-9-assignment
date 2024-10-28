import Link from "next/link";
import { db } from "@/utils/dbconnection";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import DelButton from "@/components/DelButton";

export default async function PublicFeed({ searchParams }) {
  const user = await currentUser();
  const SP = await searchParams;
  const Data = await db.query("SELECT * FROM week_9_posts");
  const wrangle = Data.rows;

  if (SP.sort === "desc") {
    wrangle.reverse();
  }

  async function displayLikes(param) {
    "use server";
    const likes = await db.query(
      `SELECT * FROM postlikes WHERE likes = TRUE AND post_id = $1 `,
      [param]
    );
    const dislikes = await db.query(
      `SELECT * FROM postlikes WHERE likes = FALSE AND post_id = $1`,
      [param]
    );
    const ln = likes.rows;
    const likesNo = ln.length;
    const dn = dislikes.rows;
    const dislikesNo = dn.length;

    return (
      <>
        <p className="m-4">
          likes:{likesNo} dislikes:{dislikesNo}
        </p>
      </>
    );
  }

  return (
    <>
      <h1>home</h1>
      <p>all posts</p>
      <div>
        <h1 className="flex justify-center m-5">posts</h1>
        <div className="flex justify-center">
          <Link
            className="m-4 bg-amber-600 bg-opacity-25 p-3 rounded-xl"
            href="/publicFeed?sort=asc"
          >
            sort ascending
          </Link>
          <Link
            className="m-4 bg-amber-600 bg-opacity-25 p-3 rounded-xl"
            href="/publicFeed?sort=desc"
          >
            sort descending
          </Link>
        </div>

        {wrangle.map((item) => {
          return (
            <div className="flex flex-col m-2 items-center" key={item.id}>
              <div className="flex">
                <p
                  id={item.id}
                  className="m-2 bg-slate-800 p-5 rounded-xl text-purple-200"
                >
                  {
                    <Link
                      className="bg-blue-800 p-2  border-lime-50 border-2 rounded-xl"
                      href={`/users/${item.name}`}
                    >
                      {item.name}
                    </Link>
                  }
                  :{item.post}
                </p>
              </div>
              <div className="flex">
                <div className="flex">
                  <Link
                    href={`publicFeed/${item.id}`}
                    className="flex m-2 bg-purple-950 p-1.5 rounded-2xl w-40 justify-center items-center"
                  >
                    leave a comment
                  </Link>
                </div>
                <form
                  action={async function handleDel() {
                    "use server";
                    console.log(`delete`);
                    await db.query(
                      `DELETE FROM week_9_posts WHERE id = ${item.id}`
                    );

                    revalidatePath("/publicFeed");
                  }}
                >
                  {user.id === item.user_id && <DelButton />}
                </form>

                <form
                  action={async function like() {
                    "use server";

                    await db.query(
                      `INSERT INTO postlikes (user_name,likes,dislikes,post_id,uni) VALUES ($1,'yes','no',$2,$3) ON CONFLICT (uni) DO UPDATE SET likes = EXCLUDED.likes, dislikes = EXCLUDED.dislikes;`,
                      [user.id, item.id, user.id + item.id]
                    );

                    revalidatePath("/publicFeed");
                  }}
                >
                  <button className="m-4" type="submit">
                    like
                  </button>
                </form>

                <form
                  action={async function dislike() {
                    "use server";

                    await db.query(
                      `INSERT INTO postlikes (user_name,likes,dislikes,post_id,uni) VALUES ($1,'NO','YES', $2,$3) ON CONFLICT (uni) DO UPDATE SET likes = EXCLUDED.likes, dislikes = EXCLUDED.dislikes;`,
                      [user.id, item.id, user.id + item.id]
                    );

                    revalidatePath("/publicFeed");
                  }}
                >
                  <button className="m-4" type="submit">
                    dislike
                  </button>
                </form>
                <div>{displayLikes(item.id)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
