"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),            
});

export const SignInView = () => {
  const router=useRouter();
  const [error,setError]=useState<string | null>(null);         {/*we are setting default value to null */}
  const [pending,setPending]= useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit=(data: z.infer<typeof formSchema>)=>{
    setError(null);                                       {/*reset error*/}
    setPending(true);
    authClient.signIn.email(
      {
        email:data.email,
        password:data.password,
      },
      {
        onSuccess:()=>{
          setPending(false);
          router.push("/");             {/*push nifo to the front page from router */}
        },
        onError:({error})=>{
          setError(error.message);
          setPending(false);
        },
      }
    );
    
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome Back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@gmail.com"
                            {...field}
                          />
                          {/* this will use the formschema used earlier */}
                        </FormControl>
                        <FormMessage /> {/* will display any error messages */}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                          {/* this will use the formschema used earlier */}
                        </FormControl>
                        <FormMessage /> {/* will display any error messages */}
                      </FormItem>
                    )}
                  />
                </div>
                {/* !! turn it into a boolean */}
                {!!error && (                     
                  <Alert className="bg-destructive/20 border-none">        {/* Alert part is mentioned here */}
                     <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
                     <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button
                disabled={pending}
                  type="submit"
                  className="w-full"
                >  
                Sign-in
                </Button>                     {/* continue part mentioned here */}
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-border" />
                  <span className="mx-4 text-muted-foreground text-sm bg-card px-2">
                    or continue with
                  </span>
                  <div className="flex-grow border-t border-border" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                  disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full"
                  >
                    Google
                  </Button>
                  <Button
                  disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full"
                  >
                    Github
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?<Link href="/sign-up" className="underline underline-offset-4">     {/*cant put apostofi directlt-ERROR */}
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-cyan-300 to-cyan-600 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            {/* Use next/image instead of <img> for optimization in Next.js */}
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />

            <p className="text-2xl font-semibold text-white">Tacular.AI</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs
      text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue,you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};
