import { db } from "@/server/db";
import { redirect } from 'next/navigation'; // Ensure correct import
import { notFound } from 'next/navigation';
import { auth, clerkClient, EmailAddress } from "@clerk/nextjs/server";
import React from "react";

const SyncUser = async() => {
    const {userId} = await auth()

    if(!userId) {
        throw new Error("User not found")
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if(!user.emailAddresses[0]?.emailAddress) {
        return notFound()
    }

    await db.user.upsert({
        where: {
            emailAddress: user.emailAddresses[0]?.emailAddress?? ""
        },
        update: {
            imageURL: user.imageUrl,
            firstName: user.firstName,
            lastName: user.lastName,
        },
        create: {
            id: userId,
            emailAddress: user.emailAddresses[0]?.emailAddress?? "",
            imageURL: user.imageUrl,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    })
    return redirect("/dashboard")
}
export default SyncUser;