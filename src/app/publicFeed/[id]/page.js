import { db } from "@/utils/dbconnection";
import { revalidatePath } from "next/cache";
import DelButton from "@/components/DelButton";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function Comments({ params }) {
  const user = await currentUser();
  const myParams = await params;

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

  const pd = await db.query(
    `SELECT * FROM week_9_posts WHERE id = ${myParams.id}`
  );
  const pdw = pd.rows;

  const cd = await db.query(
    `SELECT * FROM week_9_comments WHERE post_id = ${myParams.id}`
  );
  const cdw = cd.rows;

  async function handleSaveComment(formData) {
    "use server";
    const name = user.firstName;
    const comment = formData.get("comment");
    const postId = `${myParams.id}`;
    const userID = user.id;

    await db.query(
      `INSERT INTO week_9_comments (name, comment, post_id, user_id) VALUES ($1, $2, $3, $4)`,
      [name, comment, postId, userID]
    );

    revalidatePath(`/publicFeed/${myParams.id}`);
  }

  return (
    <div>
      <h2 className="flex items-center justify-center mt-10 bg-amber-300 bg-opacity-25 p-4 rounded-xl">
        post
      </h2>

      {pdw.map((item) => {
        return (
          <>
            <div
              className="flex flex-col items-center justify-center m-20 bg-purple-400 bg-opacity-25 p-5 rounded-xl text-lg "
              key={item.id}
            >
              {
                <Link
                  className="text-purple-300 bg-blue-900 p-2 rounded-xl  border-lime-50 border-2"
                  href={`/users/${item.name}`}
                >
                  {item.name}:
                </Link>
              }
              <p>{item.post}</p>
            </div>
          </>
        );
      })}
      <h2 className="flex items-center justify-center bg-amber-300 bg-opacity-25 p-4 rounded-xl">
        comments
      </h2>
      <div className="bg-blue-600 bg-opacity-25 p-4 rounded-xl m-10">
        {cdw.map((item2) => {
          return (
            <>
              <div
                className="flex items-center justify-center m-5  bg-blue-400 bg-opacity-25 p-5 rounded-xl"
                key={item2.id}
              >
                {
                  <Link
                    className="mr-5 text-green-300 bg-blue-900 p-2 rounded-xl border-lime-50 border-2"
                    href={`/users/${item2.name}`}
                  >
                    {item2.name}:
                  </Link>
                }
                <p className="text-cyan-200">{item2.comment}</p>
              </div>
              <div>
                <form
                  action={async function handleDel() {
                    "use server";
                    console.log(`delete`);
                    await db.query(
                      `DELETE FROM week_9_comments WHERE id = ${item2.id}`
                    );

                    revalidatePath(`/publicFeed/${item2.id}`);
                  }}
                >
                  {user.id === item2.user_id && <DelButton />}
                </form>
                <div className="flex text-center justify-center">
                  <form
                    action={async function like() {
                      "use server";

                      await db.query(
                        `INSERT INTO commentlikes (user_name,likes,dislikes,comment_id) VALUES ($1,'yes','no',$2) ON CONFLICT (user_name) DO UPDATE SET likes = EXCLUDED.likes, dislikes = EXCLUDED.dislikes;`,
                        [user.id, item2.comment_id]
                      );

                      revalidatePath(`/publicFeed/${myParams.id}`);
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
                        `INSERT INTO commentlikes (user_name,likes,dislikes,comment_id) VALUES ($1,'NO','YES', $2) ON CONFLICT (user_name) DO UPDATE SET likes = EXCLUDED.likes, dislikes = EXCLUDED.dislikes;`,
                        [user.id, item2.comment_id]
                      );

                      revalidatePath(`/publicFeed/${myParams.id}`);
                    }}
                  >
                    <button className="m-4" type="submit">
                      dislike
                    </button>
                  </form>
                  <p>{displayLikes(item2.id)}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div>
        <form
          action={handleSaveComment}
          className="m-10 mt-20 bg-yellow-400 bg-opacity-25 rounded-xl"
        >
          <label htmlFor="comment">comment</label>
          <textarea
            className="post-comment"
            id="comment"
            type="text"
            name="comment"
            required
          />
          <button
            className="bg-amber-600 p-2 m-4 rounded-2xl text-red-700"
            type="submit"
          >
            save comment
          </button>
        </form>
      </div>
    </div>
  );
}
