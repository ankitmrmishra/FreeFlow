"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import AuthLayout from "../authlayout";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-400">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-zinc-300">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              className="border-zinc-700 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none text-zinc-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-black px-2 text-zinc-500">
              or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white"
          >
            Google
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white"
          >
            GitHub
          </Button>
        </div>
        <div className="text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-400 hover:text-purple-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
