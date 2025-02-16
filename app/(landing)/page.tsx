import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <div>Landing page (unprotected page)</div>

      <Link href="/sign-in">
        <Button> Sign In</Button>
      </Link>
      <Link href="/sign-up">
        <Button> Sign Up</Button>
      </Link>
    </>
  );
};

export default LandingPage;
