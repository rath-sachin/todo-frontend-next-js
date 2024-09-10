"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { FormField } from "@/components/form-field";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { useSession } from "@/session";
import axios from "axios";
export default function Page() {
  const session = useSession();
  const router = useRouter();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  async function signup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      {
        username: username.current?.value,
        password: password.current?.value,
        email: email.current?.value,
        name: name.current?.value,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data);

    router.push("/login");
  }
  return (
    <div className="flex h-screen justify-center items-center bg-gray-300">
      <form
        onSubmit={signup}
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
        <FormField>
          <Label>Email</Label>
          <Input name="email" ref={email} />
        </FormField>
        <FormField>
          <Label>Name</Label>
          <Input name="name" ref={name} />
        </FormField>
        <Button>Signup</Button>
      </form>
    </div>
  );
}
