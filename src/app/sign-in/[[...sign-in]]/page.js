import { SignIn } from "@clerk/nextjs";

export default async function SignInPage() {
  return (
    <>
      <h1>Sign-in </h1>
      <SignIn />
    </>
  );
}
