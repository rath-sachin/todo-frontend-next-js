"use client";
import axios from "axios";
import { FormEvent, FormEventHandler, useRef } from "react";
export default function Page() {
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
    console.log(res.data);
  }
  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={login} className="space-y-4 p-5 border rounded">
        <div>
          <label className="block">Username</label>
          <input className="text-black" ref={username}></input>
        </div>
        <div>
          <label className="block">Password</label>
          <input className="text-black" ref={password}></input>
        </div>
        <button className="bg-gray-700 w-full text-black">Login</button>
      </form>
    </div>
  );
}
