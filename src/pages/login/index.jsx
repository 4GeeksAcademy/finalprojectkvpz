import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from 'next/link';

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const supabase = useSupabaseClient();
  const router = useRouter();
  const handleLogin = async (values) => {
    
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email: values.email,
        password: values.password,
      }
    );
    if (signInError) {
      return;
    }
    if (!signInError && data && data.session) {
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      router.replace("/dashboard");
    }
  };
  const handleSignup = async () => {
    const values = form.getValues();
    const { data, error: signInError } = await supabase.auth.signUp({
      loginemail: values.email,
      loginpassword: values.password,
    });
    if (signInError) {
      return;
    }
    if (!signInError && data && data.session) {
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      router.replace("/dashboard");
    }
  };
  
  return (

    <div className="container">

      <img src="/LogIn.jpg" alt="Login Background Image"/>

      <form onSubmit={form.handleSubmit(handleLogin)} className="login-form">

        <input type='email' className="loginemail" placeholder='Email' {...form.register("email")}/>
        <input type='password' className="loginpassword" placeholder='Password' {...form.register("password")}/>
        <button type="submit" className="loginlogin">LOGIN</button>
        <Link href="/home" className="logincancel">CANCEL</Link>

      </form>

    </div>
    
  );
}