"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { user } = useUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, [user]);

  if (!user) return <div>Please sign in</div>;

  // تحقق من الايميل أو الدور
  if (user.primaryEmailAddress?.emailAddress !== "aliqannan2003f@gmail.com") {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
