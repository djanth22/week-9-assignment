import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function InitialPage() {
  return (
    <>
      <div className="initial page">
        <h1 className="initPage-title">welcome, please sign in to continue</h1>
        <div className="sign-in">
          <SignInButton mode="modal">sign in</SignInButton>
        </div>
        <div className="sign-up">
          <SignUpButton>sign up</SignUpButton>
        </div>
      </div>
    </>
  );
}
