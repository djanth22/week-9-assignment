import Link from "next/link";
import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import DelButton from "@/components/DelButton";
import { revalidatePath } from "next/cache";

export default async function UsersPosts() {
  const user = await currentUser();

  const userposts = await db.query(
    `SELECT * FROM week_9_posts WHERE user_id = $1`,
    [user.id]
  );
  const UPW = userposts.rows;
  return (
    <>
      <h1>posts from user</h1>
      {UPW.map((item) => {
        return (
          <div className="flex flex-col m-2 items-center" key={item.id}>
            <div className="flex">
              <p className="m-2 bg-slate-800 p-5 rounded-xl text-purple-200">
                <Link
                  className="bg-blue-800 p-2  border-lime-50 border-2 rounded-xl"
                  href={`/users/${item.name}`}
                >
                  {item.name}:
                </Link>
                {item.post}
              </p>
            </div>
            <form
              action={async function handleDel() {
                "use server";
                console.log(`delete`);
                await db.query(
                  `DELETE FROM week_9_posts WHERE id = ${item.id}`
                );

                revalidatePath("/posts");
              }}
            >
              <DelButton />
            </form>
          </div>
        );
      })}
      <Link href="/newPost">new post</Link>
    </>
  );
}
