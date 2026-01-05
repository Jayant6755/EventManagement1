
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {  BrainCircuit  } from "lucide-react";

const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 right-0 z-50  backdrop-blur-lg border-b border-border bg-red-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl md:text-3xl font-bold text-foreground">EventFlow</span>
          </Link>
          <div className="hidden border-black md:flex items-center gap-3">
          <Link to="/create-event"> <Button variant="default" size="sm" className="cursor-pointer bg-red-500 text-white text-xl">
              Create +
            </Button></Link>
          </div>
        </div> 
      </div>
    </nav>
  );
};

export default Navbar;
