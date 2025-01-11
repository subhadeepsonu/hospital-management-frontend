"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();
    const path = usePathname();
    const [role, setRole] = useState<string | null>();
    useEffect(() => {
        const role = localStorage.getItem('role');
        setRole(role);
    }, [path])
    if (path === '/') {
        return null;
    }
    return (
        <div className="h-16 fixed w-full bg-gray-800 text-white flex items-center justify-between px-5">
            <h1>Navbar</h1>
            {role === 'admin' ? <div className="w-1/4 flex justify-around items-center h-full">
                <Link href={"/manager"} >patients</Link>
                <Link href={"/manager/pantry"} >pantry</Link>
                <Link href={"/manager/delivery"} >delivery</Link>
            </div> : ""}
            <Button
                variant={"secondary"}
                onClick={() => {
                    localStorage.removeItem('role');
                    localStorage.removeItem('token');
                    router.push('/');
                }}
            >
                Logout
            </Button>
        </div>
    );
}
