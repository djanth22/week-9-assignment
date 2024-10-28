import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage() {
  return (
    <>
      <h1>Sign-up</h1>
      <SignUp />
    </>
  );
}
