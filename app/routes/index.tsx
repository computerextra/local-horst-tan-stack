// app/routes/index.tsx
import { Button } from "@mantine/core";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { db } from "../prisma";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/tanstack-start";

async function readCount() {
  const res = await db.counter.findFirst({
    where: {
      id: 1,
    },
  });

  if (res != null) {
    return res.count;
  } else {
    return 0;
  }
}

const getCount = createServerFn("GET", () => {
  return readCount();
});

const updateCount = createServerFn("POST", async (addBy: number) => {
  const count = await readCount();
  await db.counter.upsert({
    where: {
      id: 1,
    },
    update: {
      count: count + addBy,
    },
    create: {
      count: count + addBy,
    },
  });
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div>
      <SignedIn>
        <p>you are signed in</p>
        <UserButton />
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <p>You are signed out</p>
        <SignInButton />
        <SignUpButton />
        <Button
          variant="light"
          color="pink"
          onClick={() => {
            updateCount(1).then(() => {
              router.invalidate();
            });
          }}
        >
          Add 1 to {state}?
        </Button>
      </SignedOut>
    </div>
  );
}
