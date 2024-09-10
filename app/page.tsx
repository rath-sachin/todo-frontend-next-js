"use client";
// import Image from "next/image";
// import axios from "axios";
// import { FormEvent, FormEventHandler, useRef } from "react";

import { Button } from "@/components/button";
import Page from "./login/page";
import axios from "axios";
import { unescape } from "querystring";
import { useSession } from "@/session";
import { redirect } from "next/navigation";

// export default function Home() {
//   const todo = useRef<HTMLInputElement>(null);
//   async function setTodos(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const res = await axios.post(
//       "http://localhost:5000/api/todo",
//       {
//         name: todo.current?.value,
//       },
//       {
//         withCredentials: true,
//       }
//     );
//     console.log(res.data);
//   }

//   return (
//     <div className="flex h-screen justify-center items-center">
//       <form onSubmit={setTodos} className="space-y-4 p-5 border rounded">
//         <div>
//           <label className="block">Todos</label>
//           <input className="text-black" ref={todo}></input>
//         </div>
//         <button className="bg-gray-700 w-full text-black">Save</button>
//       </form>
//     </div>
//   );
// }
// }
//
export default function Home() {
  const session = useSession();
  async function onClick() {
    await axios.post("http://localhost:5000/api/auth/signout", undefined, {
      withCredentials: true,
    });
    session.setUser(null);
  }
  if (session.user === null) {
    redirect("/login");
  }
  if (session.user === undefined) {
    return "loading";
  }
  return <Button onClick={onClick}>signout</Button>;
}
