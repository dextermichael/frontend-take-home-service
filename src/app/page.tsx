import Login from "@/components/Login";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session : any =await getServerSession(authOptions);
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div>
      <Login />
    </div>
  );
}
