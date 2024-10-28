import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbconnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewPost() {
  const user = await currentUser();
  async function handleSave(formData) {
    "use server";
    const name = user.firstName;
    const post = formData.get("post");
    const userID = user.id;

    await db.query(
      `INSERT INTO week_9_posts (name, post, user_id) VALUES ($1, $2, $3)`,
      [name, post, userID]
    );

    revalidatePath("/usersPosts");
    redirect("/usersPosts");
  }
  return (
    <>
      <h1>form for new post</h1>
      <div>
        <form id="new-post" action={handleSave}>
          <label htmlFor="post">post</label>
          <textarea
            className="post-comment"
            id="post"
            type="text"
            name="post"
            required
          />
          <button
            className="bg-amber-600 p-2 m-4 rounded-2xl text-red-700"
            type="submit"
          >
            save post
          </button>
        </form>
      </div>
    </>
  );
}
