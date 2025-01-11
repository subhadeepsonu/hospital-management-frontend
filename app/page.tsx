"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { BaseUrl } from "./constants"
import { toast } from "sonner"
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur"
  });
  const MutateLogin = useMutation({
    mutationFn: async () => {
      const repsonse = await axios.post(`${BaseUrl}/login`, {
        email: form.getValues().email,
        password: form.getValues().password
      })
      return repsonse.data
    },
    onSettled: (data) => {
      if (data.success) {
        localStorage.setItem("token", data.message)
        const decode: {
          role: string
        } = jwtDecode(data.message)
        localStorage.setItem("role", decode.role)
        if (decode.role === "admin") {
          router.push("/manager")
        } else if (decode.role === "delivery") {
          router.push("/delivery")
        } else if (decode.role === "pantry") {
          router.push("/pantry")
        }
        toast.success("Login Success")
      } else {
        toast.error(data.message)
      }
    }
  })
  return (
    <div className="h-screen w-full  flex justify-center items-center">
      <div className="w-96 h-96 border-2 rounded-lg flex justify-center items-center">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {
            MutateLogin.mutate()
          })} className="space-y-8">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-80" placeholder="joe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={MutateLogin.isPending} type="submit">Submit</Button>
          </form>
        </Form>

      </div>
    </div>
  );
}
