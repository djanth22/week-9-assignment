import { db } from "@/utils/dbconnection";

export default async function users() {
  const userInfo = await db.query(`SELECT * FROM users`);
  const uIw = userInfo.rows;

  //   console.log(uIw);

  return (
    <>
      <h1>profile</h1>

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
    </>
  );
}
