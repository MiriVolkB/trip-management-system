export async function login(id: string) {
  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  console.log("STATUS:", res.status);
  console.log("DATA:", data);

  return data;
}