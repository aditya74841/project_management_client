"use client";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
  tap: { scale: 0.95 },
};

export default function SignupSheet({
  isOpen,
  onOpenChange,
  signupEmail,
  setSignupEmail,
  signupPassword,
  setSignupPassword,
  handleSignup,
}) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="rounded-full bg-indigo-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-indigo-700"
        >
          Sign Up
        </motion.button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Join Audit Pro</SheetTitle>
        </SheetHeader>
        <div className="p-6 space-y-4">
          <div>
            <Label>Email</Label>
            <Input value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="Enter email" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Create password" />
          </div>
        </div>
        <SheetFooter>
          <Button className="w-full bg-indigo-600 text-white" onClick={handleSignup}>
            Sign Up
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
