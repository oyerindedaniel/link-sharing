import { redirect } from "next/navigation";

export default function Home() {
  redirect("/create-account");

  return <main>Link sharing app</main>;
}
