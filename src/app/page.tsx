import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AlignCenter, Check, Folder, FolderTree, PlusIcon, Sparkles, Video, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 flex flex-col w-[70%] mx-auto justify-center font-roboto-slab">
      <div className="py-48 text-center">
        <span className="px-3 py-2 rounded-full bg-indigo-700 text-white">CREATA AI</span>
        <p className="text-5xl mt-5 font-semibold">4 hours for editing that video? <span className="text-indigo-700">Creata does that in Minutes</span></p>
        <p className="text-2xl text-muted-foreground">Get content ideas, scripts, and edits—make your brand 'premium'.</p>
        <Link href="/dashboard">
          <Button size={'lg'} className="mt-5 cursor-pointer bg-indigo-700 hover:bg-indigo-600 flex gap-2 mx-auto"><PlusIcon /> New Project</Button>
        </Link>
      </div>
      <Card className="py-24 flex flex-col items-center">
        <Video size={64} className="fill-current text-indigo-700" />
        <p className="text-5xl"><span className="text-indigo-700">AI Video Editing</span> built for speed</p>
        <p className="text-lg text-muted-foreground">Edit your videos with AI and get better results in less time.</p>
      </Card>
      <div className="flex mt-5 gap-4">
        <Card className="px-6 flex flex-col gap-1 w-1/3">
          <Sparkles size={32} className="fill-current text-indigo-700" />
          <CardTitle className="text-3xl">Stuck at Ideas? no more</CardTitle>
          <CardDescription>Get automatic ideas for videos for your brand according to your preferences & what your audience wants.</CardDescription>
        </Card>
        <Card className="px-6 flex flex-col gap-1 w-1/3">
          <AlignCenter size={32} className="fill-current text-indigo-700" />
          <CardTitle className="text-3xl">Make your videos shine!</CardTitle>
          <CardDescription>Generate better, instant & unique scripts for your content.</CardDescription>
        </Card>
        <Card className="px-6 flex flex-col gap-1 w-1/3">
          <Folder size={32} className="fill-current text-indigo-700" />
          <CardTitle className="text-3xl">Organizing takes time...But no more</CardTitle>
          <CardDescription>One-click Organize your content related work & videos into folders without any extra effort.</CardDescription>
        </Card>
      </div>
      <div className="flex mt-2 gap-4">
        <Card className="px-6 flex flex-col gap-1 w-1/3">
          <Folder size={32} className="fill-current text-indigo-700" />
          <CardTitle className="text-3xl">Making Assets don't waste your time anymore</CardTitle>
          <CardDescription>Generate AI Assets & use them in your edits without manually changing tabs & downloading assets.</CardDescription>
        </Card>
      </div>
      <br />

      <Card className="py-24 bg-indigo-700 items-center flex flex-col mt-5">
        <p className="text-3xl text-white">Less thinking. More shipping—without wasting time.</p>
        {/* <p className="text-lg text-white">Get started with Creata for as low as $12.</p> */}
      </Card>

      <div className="py-12">
        <h2 className="text-6xl font-bold text-center mb-12">Why Creata is #1 Choice for Founders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before Card */}
          <Card className="p-8 border-red-100 bg-red-50/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-400/30"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <X size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-700">Manual Workflow</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-1 shrink-0 text-red-400" size={18} />
                <span>Hours spent staring at a blank screen</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-1 shrink-0 text-red-400" size={18} />
                <span>Complex editing software learning curve</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-1 shrink-0 text-red-400" size={18} />
                <span>Inconsistent posting due to burnout</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-1 shrink-0 text-red-400" size={18} />
                <span>Expensive freelance editors</span>
              </li>
            </ul>
          </Card>

          {/* After Card */}
          <Card className="p-8 border-indigo-100 bg-indigo-50/40 relative overflow-hidden shadow-xl ring-1 ring-indigo-700/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-bold text-indigo-950">The Creata Way</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <Check className="mt-1 shrink-0 text-indigo-600" size={18} />
                <span>AI-generated viral video concepts</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <Check className="mt-1 shrink-0 text-indigo-600" size={18} />
                <span>Professional edits in minutes, not hours</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <Check className="mt-1 shrink-0 text-indigo-600" size={18} />
                <span>Consistent, daily content output</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <Check className="mt-1 shrink-0 text-indigo-600" size={18} />
                <span>Fraction of the cost of an editor</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <div className="py-12">
        <h2 className="text-6xl font-bold text-center mb-12">Why Creata is #1 Choice for Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before Card */}
          <Card className="p-8 border-red-100 bg-red-50/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-400/30"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <X size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-700">The Struggle</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-1 shrink-0 text-red-400" size={18} />
                <span>Editing takes longer than filming</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-1 shrink-0 text-red-400" size={18} />
                <span>Inconsistent branding & style</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-1 shrink-0 text-red-400" size={18} />
                <span>Burnout from daily grind</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-1 shrink-0 text-red-400" size={18} />
                <span>Guessing what will go viral</span>
              </li>
            </ul>
          </Card>

          {/* After Card */}
          <Card className="p-8 border-indigo-100 bg-indigo-50/40 relative overflow-hidden shadow-xl ring-1 ring-indigo-700/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-bold text-indigo-950">Creator Freedom</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <Check className="mt-1 shrink-0 text-indigo-600" size={18} />
                <span>Edit & export in minutes</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <Check className="mt-1 shrink-0 text-indigo-600" size={18} />
                <span>Professional, consistent brand kit</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <Check className="mt-1 shrink-0 text-indigo-600" size={18} />
                <span>Automated scheduling & posting</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-medium">
                <Check className="mt-1 shrink-0 text-indigo-600" size={18} />
                <span>AI-driven trend analysis</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <div className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground">Choose the perfect plan for your content creation journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* $10 Plan */}
          <Card className="flex flex-col relative border-indigo-600 shadow-lg scale-105 z-10">
            <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full transform rotate-12">
              POPULAR
            </div>
            <div className="p-6">
              <CardTitle className="text-2xl mb-2 text-indigo-700">Silver</CardTitle>
              {/* <CardDescription className="mb-4">For growing content creators</CardDescription> */}
              <div className="mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button className="w-full bg-indigo-700 hover:bg-indigo-600">Get it Free</Button>
            </div>
            <p className="text-xl px-6">Monthly Included</p>

            <div className="px-6 pb-6 pt-2 flex-1">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-indigo-700" /> 50k voice generation characters
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-indigo-700" /> 5k script generation characters
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-indigo-700" /> 20 minutes of total video export
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-indigo-700" /> GPT-4o, Gemini 2.5 Flash, Eleven 2.5 Flash, Veo3.1
                </li>
              </ul>
            </div>
          </Card>

          {/* $24 Plan */}
          <Card className="flex flex-col">
            <div className="p-6">
              <CardTitle className="text-2xl mb-2">Gold</CardTitle>
              {/* <CardDescription className="mb-4">For professional brands</CardDescription> */}
              <div className="mb-6">
                <span className="text-4xl font-bold">$23.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button variant="outline" className="w-full">Get Gold</Button>
            </div>
            <p className="text-xl px-6">Monthly Included</p>

            <div className="px-6 pb-6 pt-2 flex-1">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> 200k voice generation characters
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> 50k script generation characters
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> 140 minutes of total video export
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> GPT-5, Gemini 3 Flash, Eleven 2.5 Flash, Veo3.1
                </li>
              </ul>
            </div>
          </Card>

          {/* $40 Plan */}
          <Card className="flex flex-col">
            <div className="p-6">
              <CardTitle className="text-2xl mb-2">Pay as you go</CardTitle>
              {/* <CardDescription className="mb-4">For agencies & large teams</CardDescription> */}
              <div className="mb-6">
                <span className="text-4xl font-bold"> $20</span>
                <span className="text-muted-foreground">/month (minimum)</span>
              </div>
              <Button variant="outline" className="w-full">Get Diamond</Button>
            </div>
            <div className="px-6 pb-6 pt-2 flex-1">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> Pay as you go
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
      <br />

      <p className="text-[300px] font-bold font-instrument-serif">CREATA</p>
      <Footer />
    </div>
  );
}
