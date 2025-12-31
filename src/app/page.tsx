import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AlignCenter, Check, Folder, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-6 flex flex-col w-[60%] mx-auto justify-center font-roboto-slab">
      <div className="py-16 text-center">
        <span className="px-3 py-2 rounded-full bg-indigo-700 text-white">CREATA AI</span>
        <p className="text-5xl mt-5">The <span className="text-indigo-700">Perfect tool</span> for Founders to get started on Social Media.</p>
        <p className="text-2xl">Create your account now and start building your brand.</p>
        <Button size={'lg'} className="mt-5 cursor-pointer bg-indigo-700 hover:bg-indigo-600">Make my brand</Button>
      </div>

      <div className="flex mt-5 gap-4">
        <Card className="px-6 flex flex-col gap-1 w-1/3">
          <Sparkles size={32} className="fill-current text-indigo-700" />
          <CardTitle className="text-3xl">Get Better Ideas</CardTitle>
          <CardDescription>Get automatic ideas for videos for your brand according to your preferences & what your audience wants.</CardDescription>
        </Card>
        <Card className="px-6 flex flex-col gap-1 w-1/3">
          <AlignCenter size={32} className="fill-current text-indigo-700" />
          <CardTitle className="text-3xl">Generate Instant scripts</CardTitle>
          <CardDescription>Generate better, instant & unique scripts for your content.</CardDescription>
        </Card>
        <Card className="px-6 flex flex-col gap-1 w-1/3">
          <Folder size={32} className="fill-current text-indigo-700" />
          <CardTitle className="text-3xl">Organize without efforts</CardTitle>
          <CardDescription>Organize your content related work without any extra overload.</CardDescription>
        </Card>
      </div>
      <br />

      <Card className="py-24 bg-indigo-700 items-center flex flex-col">
        <p className="text-5xl text-white">Save time, effort & cost. Reduce Cognative load</p>
        <p className="text-lg text-white">Get started with Creata for as low as $12.</p>
      </Card>

      <div className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground">Choose the perfect plan for your content creation journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Free Plan */}
          <Card className="flex flex-col">
            <div className="p-6">
              <CardTitle className="text-2xl mb-2">Starter</CardTitle>
              <CardDescription className="mb-4">Perfect for trying out Creata</CardDescription>
              <div className="mb-6">
                <span className="text-4xl font-bold">Free</span>
                <span className="text-muted-foreground">/forever</span>
              </div>
              <Button variant="outline" className="w-full">Get Started</Button>
            </div>
            <div className="px-6 pb-6 pt-2 flex-1">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> 50 Credits / month
                </li>
              </ul>
            </div>
          </Card>

          {/* $30 Plan */}
          <Card className="flex flex-col relative border-indigo-600 shadow-lg scale-105 z-10">
            <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full transform rotate-12">
              POPULAR
            </div>
            <div className="p-6">
              <CardTitle className="text-2xl mb-2 text-indigo-700">Creator</CardTitle>
              <CardDescription className="mb-4">For growing content creators</CardDescription>
              <div className="mb-6">
                <span className="text-4xl font-bold">$12</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button className="w-full bg-indigo-700 hover:bg-indigo-600">Subscribe Now</Button>
            </div>
            <div className="px-6 pb-6 pt-2 flex-1">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-indigo-700" /> 500 Credits / month
                </li>
              </ul>
            </div>
          </Card>

          {/* $60 Plan */}
          <Card className="flex flex-col">
            <div className="p-6">
              <CardTitle className="text-2xl mb-2">Pro</CardTitle>
              <CardDescription className="mb-4">For professional brands</CardDescription>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button variant="outline" className="w-full">Upgrade to Pro</Button>
            </div>
            <div className="px-6 pb-6 pt-2 flex-1">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> 2,000 Credits / month
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> Content Calendar
                </li>
              </ul>
            </div>
          </Card>

          {/* $80 Plan */}
          <Card className="flex flex-col">
            <div className="p-6">
              <CardTitle className="text-2xl mb-2">Agency</CardTitle>
              <CardDescription className="mb-4">For agencies & large teams</CardDescription>
              <div className="mb-6">
                <span className="text-4xl font-bold">$48.88</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <Button variant="outline" className="w-full">Upgrade to Agency</Button>
            </div>
            <div className="px-6 pb-6 pt-2 flex-1">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> 20,000 Credits / month
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary" /> Content Calendar
                </li>

              </ul>
            </div>
          </Card>
        </div>
      </div>
      <br />

      <p className="text-[300px] font-bold font-instrument-serif">CREATA</p>
    </div>
  );
}
