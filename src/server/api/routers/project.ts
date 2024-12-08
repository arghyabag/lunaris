import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure.input(
        z.object({
            name: z.string(),
            githubUrl: z.string(),
            githubToken: z.string().optional()
        })
    ).mutation(async({ctx, input})=>{
        // const project =await ctx.db.project.create({
        //     data:{
        //         githubUrl: input.githubUrl,
        //         name: input.name,
        //         userToProjects:{
        //             create:{
        //                 userId: ctx.user.userId!,
        //             }
        //         }
        //     }
        // })
        console.log("input",input)
        return true
    })
})