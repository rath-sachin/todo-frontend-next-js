"use client";
import { Button } from "@/components/button";
import { useSession } from "@/session";
import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Page() {
  const [todos, setTodos] = useState([]);
  const session = useSession();
  const router = useRouter();
  const name = useRef<HTMLInputElement>(null);

  async function changeStatus(id: number, status: boolean) {
    const res = await axios.put(
      `http://localhost:5000/api/todo/${id}`,
      {
        status,
      },
      {
        withCredentials: true,
      }
    );

    await getTodos();
  }

  async function deleteTodo(id: number) {
    const res = await axios.delete(`http://localhost:5000/api/todo/${id}`, {
      withCredentials: true,
    });
    await getTodos();
  }

  async function getTodos() {
    try {
      const res = await axios.get("http://localhost:5000/api/todo", {
        withCredentials: true,
      });
      setTodos(res.data);
    } catch (e) {}
  }

  useEffect(() => {
    getTodos();
  }, []);
  console.log(todos);
  async function createTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5000/api/todo",
      {
        name: name.current?.value,
      },
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    await getTodos();
  }
  async function logOut() {
    const res = await axios.post("http://localhost:5000/api/auth/signout", {
      withCredentials: true,
    });
    session.setUser(null);
  }
  {
    /* container */
  }
  return (
    <div className="flex h-screen justify-center items-center bg-gray-300">
      <div className="w-full max-w-[1440px] h-full max-h-[800px] bg-white rounded-lg overflow-hidden">
        {/* loading bar */}
        <div className="w-full h-3 bg-green-100">
          {/* progress */}
          <div className="h-full w-1/2 bg-green-500"></div>
        </div>
        {/* body */}
        <div className="flex flex-row bg-gray-600 h-full">
          {/* left-body */}
          <div className="w-full h-full bg-white overflow-hidden">
            {session.user ? (
              <div className="p-5 flex flex-col h-full overflow-auto gap-4">
                {todos.map((todo) => (
                  <div
                    className="p-2 bg-gray-200 rounded-sm font-semibold flex "
                    key={todo.id}
                  >
                    <span
                      onClick={async () =>
                        await changeStatus(todo.id, !todo.status)
                      }
                      className={todo.status ? "line-through" : ""}
                    >
                      {todo.name}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="ml-auto block p-1 bg-red-500 text-white"
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="justify-center flex items-center h-full">
                Signin to create todo!
              </div>
            )}
          </div>
          {/* right-body */}
          <div className="flex flex-col w-[500px] h-full bg-sky-200">
            {/* todos input */}
            {session.user ? (
              <form onSubmit={createTodo} className="flex flex-col p-10 gap-3">
                <input
                  className="w-full bg-white p-2 rounded-lg border border-gray-400/60"
                  type="text"
                  name="name"
                  ref={name}
                />
                <Button>Create</Button>
              </form>
            ) : null}
            <div className="mt-auto flex flex-col p-10 gap-3">
              {session.user ? (
                <Button onClick={logOut} variant="destructive">
                  Log out
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
