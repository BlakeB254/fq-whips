"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { DEMO_CREDENTIALS } from "@/lib/mock-data";
import {
  Car,
  Users,
  Loader2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, user } = useAuth();

  const initialType = searchParams.get("type") === "provider" ? "provider" : "customer";
  const [userType, setUserType] = useState<"customer" | "provider">(initialType);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.type === "customer" ? "/customer/" : "/provider/";
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, router]);

  const handleDemoLogin = (type: "customer" | "provider") => {
    const creds = type === "customer" ? DEMO_CREDENTIALS.customer : DEMO_CREDENTIALS.provider;
    setEmail(creds.email);
    setPassword(creds.password);
    setUserType(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(email, password, userType);

    if (success) {
      const redirectPath = userType === "customer" ? "/customer/" : "/provider/";
      router.push(redirectPath);
    } else {
      setError("Invalid credentials. Use the demo login buttons above.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Fast Quick Whipz"
              width={180}
              height={50}
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>
          <div>
            <h1 className="text-4xl font-bold mb-4">
              The Midwest&apos;s Most Trusted<br />Car Sharing Platform
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Join thousands of happy renters and hosts across Illinois, Michigan,
              Wisconsin, Minnesota, Indiana, and Ohio.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-primary-foreground/60">Vehicles</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-primary-foreground/60">Trips</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.9</div>
                <div className="text-primary-foreground/60">Rating</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Fast Quick Whipz. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Fast Quick Whipz"
                width={180}
                height={50}
                className="h-10 w-auto mx-auto"
              />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            {/* Demo Login Buttons */}
            <Card className="mb-6 border-dashed border-2 border-primary/30 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-center text-primary">
                  Demo Access - Click to Auto-fill
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 pb-4">
                <Button
                  variant="outline"
                  className="h-auto py-3 px-2 flex-col gap-1 overflow-hidden"
                  onClick={() => handleDemoLogin("customer")}
                >
                  <Car className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">Login as Renter</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground truncate max-w-full">
                    demo.customer@fqwhipz.com
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-3 px-2 flex-col gap-1 overflow-hidden"
                  onClick={() => handleDemoLogin("provider")}
                >
                  <Users className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">Login as Host</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground truncate max-w-full">
                    demo.provider@fqwhipz.com
                  </span>
                </Button>
              </CardContent>
            </Card>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs
                value={userType}
                onValueChange={(v) => setUserType(v as "customer" | "provider")}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="customer" className="gap-2">
                    <Car className="w-4 h-4" />
                    Renter
                  </TabsTrigger>
                  <TabsTrigger value="provider" className="gap-2">
                    <Users className="w-4 h-4" />
                    Host
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don&apos;t have an account?{" "}
              <Link href="#" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>

            <div className="mt-8 text-center">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                &larr; Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}
