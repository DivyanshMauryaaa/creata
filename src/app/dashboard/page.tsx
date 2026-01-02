'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import supabase from "@/lib/supabase"
import { useUser } from "@clerk/nextjs"
import { Brush, Folder, Pencil, Plus, Sparkles, Video } from "lucide-react"
import { useEffect, useState } from "react"

const DashboardPage = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [projects, setProjects] = useState<any>([])

    const { user } = useUser();

    const addProject = async () => {
        const { error } = await supabase.from('projects')
            .insert({
                name: name,
                user_id: user?.id
            })

        if (error) {
            console.log(error)
        }

        setOpen(false)
        setName('')
        fetchProjects()
    }

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', user?.id)

        if (error) {
            console.log(error)
        }

        setProjects(data)
    }

    useEffect(() => {
        if (user) fetchProjects();
    }, [user])

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <p className="text-4xl font-semibold">Dashboard</p>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Project</DialogTitle>
                            <DialogDescription>
                                Create a new project to start creating content.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="My Awesome Project"
                                    className="col-span-3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={addProject}>Create Project</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="mt-4 flex gap-3 flex-wrap">
                <Card className="py-6 w-[300px] px-6 cursor-pointer border-indigo-700 flex flex-col justify-end items-start hover:bg-indigo-700 hover:text-white transition-colors">
                    <Pencil size={32} className=" " />
                    <p className="text-2xl">Generate Script</p>
                </Card>
                <Card className="py-6 w-[300px] px-6 cursor-pointer border-indigo-700 flex flex-col justify-end items-start hover:bg-indigo-700 hover:text-white transition-colors">
                    <Sparkles size={32} className=" " />
                    <p className="text-2xl">Get an Idea</p>
                </Card>
                <Card className="py-6 w-[300px] px-6 cursor-pointer border-indigo-700 flex flex-col justify-end items-start hover:bg-indigo-700 hover:text-white transition-colors">
                    <Brush size={32} className=" " />
                    <p className="text-2xl">Create Assets</p>
                </Card>
                <Card className="py-6 w-[300px] px-6 cursor-pointer border-indigo-700 flex flex-col justify-end items-start hover:bg-indigo-700 hover:text-white transition-colors">
                    <Folder size={32} className=" " />
                    <p className="text-2xl">View Files</p>
                </Card>

            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {projects.map((project: any) => (
                    <Link href={`/dashboard/project/${project.id}`} key={project.id}>
                        <Card className="px-4 flex flex-col justify-end h-[200px] cursor-pointer hover:border-indigo-700 transition-colors">
                            <Video size={65} />
                            <p className="text-4xl font-semibold truncate">{project.name}</p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage;