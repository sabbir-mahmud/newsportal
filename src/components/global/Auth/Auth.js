"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openAuthModal } from "@/lib/slices/authModalSlice";
import { useRouter } from "next/navigation";

export function Auth(Component) {
    return function WithAuth(props) {
        const router = useRouter();
        const user = useAppSelector((state) => state?.user);
        const dispatch = useAppDispatch();
        if (!user) {
            dispatch(openAuthModal({ type: "login" }));
            router.push("/");
            return null;
        }

        return <Component {...props} />;
    };
}
