import { db } from "@/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function EditProfile() {
  const user = await currentUser();

  async function handleSaveUser(formData) {
    "use server";
    const name = user.firstName;
    const bio = formData.get("bio");
    const userID = user.id;

    await db.query(
      `INSERT INTO users (userID, user_name, bio) VALUES ($1, $2, $3) ON CONFLICT (userID) DO UPDATE SET bio = EXCLUDED.bio;`,
      [userID, name, bio]
    );

    revalidatePath("/editProfile");
  }
  return (
    <>
      <h1>edit page. form here for user to edit details</h1>
      <p className="text-center">username: {user.username}</p>
      <p className="text-center"> name: {user.fullName}</p>
      <form action={handleSaveUser}>
        <label htmlFor="bio">bio:</label>
        <input id="bio" type="text" name="bio" required />
        <button type="submit">save user profile</button>
      </form>
    </>
  );
}
