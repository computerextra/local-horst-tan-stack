import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn, json } from "@tanstack/start";
import { getAuth } from "@clerk/tanstack-start/server";
import { createClerkClient } from "@clerk/backend";

const authStateFn = createServerFn("GET", async (_, { request }) => {
  const { userId } = await getAuth(request);
  let isAdmin = false;
  const clerkClient = createClerkClient({
    secretKey: import.meta.env.VITE_CLERK_SECRET_KEY,
  });

  if (!userId) {
    throw redirect({
      to: "/sign-in",
    });
  }
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  if (user != null) {
    if (
      user.primaryEmailAddress?.emailAddress ==
        "johannes.kirchner@computer-extra.de" ||
      user.primaryEmailAddress?.emailAddress ==
        "christoph.salowski@computer-extra.de"
    ) {
      isAdmin = true;
    }
  }
  return json({ user, isAdmin });
});

export const Route = createFileRoute("/user/")({
  component: UserPage,
  beforeLoad: async () => await authStateFn(),
  loader: async ({ context }) => {
    return { user: context.user, isAdmin: context.isAdmin };
  },
});

function UserPage() {
  const state = Route.useLoaderData();

  return (
    <>
      <h1>Welcome! Your ID is {state.user?.username}!</h1>
      {state.isAdmin && <p>Du Bist Admin</p>}
    </>
  );
}
