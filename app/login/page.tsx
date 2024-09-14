"use client";
import axios from "axios";
import { FormEvent, FormEventHandler, useContext } from "react";
import { FormField } from "@/components/form-field";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { useRef } from "react";
import { SessionContext, useSession } from "@/session";
import { redirect } from "next/navigation";


export default function Page() {
  const session = useSession();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        username: username.current?.value,
        password: password.current?.value,
      },
      {
        withCredentials: true,
      }
    );
    session.setUser(res.data);
    console.log(res.data);
  }
  if (session.user) {
    redirect("/");
  }
  if (session.user === undefined) {
    return "loading";
  }
  return (
    <div className="flex h-screen justify-center items-center bg-gray-300">
      <form
        onSubmit={login}
        className="space-y-4 p-5 border rounded flex flex-col bg-white"
        action=""
      >
        <FormField>
          <Label>Username</Label>
          <Input name="username" ref={username} />
        </FormField>
        <FormField>
          <Label>Password</Label>
          <Input name="password" ref={password} />
        </FormField>
        <Button>Login</Button>
      </form>
    </div>
  );
}
