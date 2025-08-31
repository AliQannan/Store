"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Sparkles, ShoppingCart, ArrowRight, Globe2, LineChart as LineChartIcon } from "lucide-react";

/**
 * Next.js App Router: place this file at e.g. app/(marketing)/otoscope/page.tsx
 * Assumes Tailwind + shadcn/ui + lucide-react are installed.
 * All copy is in English as requested.
 */

const features = [
  {
    icon: <Sparkles className="w-6 h-6"/>,
    title: "Fiber LED Lighting",
    desc: "Bright and long-lasting illumination for clear ear and eye examination.",
  },
  {
    icon: <Shield className="w-6 h-6"/>,
    title: "Professional Quality",
    desc: "A diagnostic kit combining Otoscope and Ophthalmoscope with one handle and storage pouch.",
  },
  {
    icon: <Globe2 className="w-6 h-6"/>,
    title: "Multi-Purpose Use",
    desc: "Suitable for clinics, emergency, medical universities, and home visits for professionals.",
  },
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Badge className="rounded-2xl text-xs py-1 px-3">Professional Medical Kit</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 leading-tight">
              Marketing Campaign for <span className="text-primary">Otoscope & Ophthalmoscope</span> with Fiber LED Lighting
            </h1>
            <p className="text-slate-600 mt-5 text-lg">
              A complete set for ear and eye examination with storage pouch. Perfect for ENT doctors, nurses, and medical students. Portable design, strong lighting, and full accessories.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <Button size="lg" className="rounded-2xl">
                <ShoppingCart className="ms-2 w-5 h-5"/> Order Now
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl">
                <ArrowRight className="ms-2 w-5 h-5"/> Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
              <div className="flex items-center gap-1"><Check className="w-4 h-4"/> Fast Shipping</div>
              <div className="flex items-center gap-1"><Check className="w-4 h-4"/> Replacement Warranty</div>
              <div className="flex items-center gap-1"><Check className="w-4 h-4"/> After-Sales Support</div>
            </div>
          </div>

          <Card className="border-0 shadow-xl rounded-2xl">
            <CardContent className="p-0">
              {/* Placeholder product mock */}
              <div className="aspect-video w-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl grid place-items-center">
                <div className="text-center p-8">
                  <LineChartIcon className="w-10 h-10 mx-auto"/>
                  <p className="mt-3 text-slate-600">Product Image / Demo Video</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-white">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card key={i} className="rounded-2xl shadow-md border-0">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="text-primary mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-slate-600 mt-2 text-sm">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
