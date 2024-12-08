"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};
const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject= api.project.createProject.useMutation()
    function onSubmit(data:FormInput) { 
        createProject.mutate({
            githubUrl: data.repoUrl,
            name: data.projectName,
            githubToken: data.githubToken
        },{
            onSuccess:()=>{
                toast.success('Project Created Successfully')
                reset()
        },
        onError:(error)=>{
            toast.error('Failed to create project')
        }
    })
        return true
    }
    
  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img src="/undraw_github.svg" className="h-56 w-auto" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your Github Repository
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of your repository to link it to Lunaris!
          </p>
        </div>
        <div className="h-4"></div>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                {...register('projectName',{required:true}) }
                placeholder='Project Name'
                required
                />
                <div className="h-2"></div>
                <Input
                {...register('repoUrl',{required:true}) }
                placeholder='Github Url'
                type='url'
                required
                />
                <div className="h-2"></div>
                <Input
                {...register('githubToken') }
                placeholder='Github Token'

                />
                <div className="h-4"></div>
                <Button type="submit">
                    Create Project
                </Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;