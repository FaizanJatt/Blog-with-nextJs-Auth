import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Profile() {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  if (session) {
    return (
      <>
        <h1>Profile</h1>
        <p>Avatar</p>
        <img src={session.user.image} />
        <p>User: {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        {session.user.username && <p>{session.user.name}</p>}
      </>
    );
  }
}
