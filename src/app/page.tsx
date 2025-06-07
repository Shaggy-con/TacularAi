"use client";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LogIn } from "lucide-react";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onSuccess: () => {
          window.alert("Sign up successful!");
        },
        onError: () => {
          window.alert("Sign up failed!");
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          window.alert("Logged in successfully!");
        },
        onError: () => {
          window.alert("Login failed!");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-y-8">
      <div className="p-4 flex flex-col gap-y-4 border rounded-lg">
        <h2 className="text-lg font-semibold">Sign Up</h2>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSignUp}>Create User</Button>
      </div>

      <div className="p-4 flex flex-col gap-y-4 border rounded-lg">
        <h2 className="text-lg font-semibold">Login</h2>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>
          <LogIn className="mr-2 w-4 h-4" /> Login
        </Button>
      </div>
    </div>
  );
}