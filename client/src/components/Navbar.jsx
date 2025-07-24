import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import DarkMode from "@/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await logoutUser();
  };

  console.log(user);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User loggest out");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex items-center justify-between h-full">
        <div className="flex gap-5">
          <School size={"30"} />
          <h1
            className="hidden md:block font-extrabold text-2xl hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            E-learning
          </h1>
        </div>
        <div className="flex items-center justify-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">
                      <span>My learning</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">
                      <span>Edit profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logOutHandler}>
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}

          {/* User icons dark mode icon */}
          <DarkMode />
        </div>
      </div>

      {/* Mobile device */}
      <div className="flex md:hidden items-center justify-between px-4  h-full">
        <h1 className="font-extrabold text-2xl" onClick={() => navigate("/")} >E_learning</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor";
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-2xl font-semibold" onClick={() => navigate("/")}>E-learning</SheetTitle>
          <div>
            <DarkMode />
          </div>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-6 mb-6">
          <span>My learning</span>
          <span>Edit Profile</span>
          <span>Logout</span>
        </nav>
        {role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button
                className="w-full"
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
