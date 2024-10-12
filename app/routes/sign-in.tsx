import { SignInButton, SignUpButton } from "@clerk/tanstack-start";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: () => (
    <>
      <h1>Du bist nicht angemeldet.</h1>
      <p>Bitte erst machen!</p>
      <SignInButton />
      <SignUpButton />
      <Link to="/">Go home</Link>
    </>
  ),
});
