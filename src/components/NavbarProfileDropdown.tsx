import type { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserProfileAvatar from "@/components/UserProfileAvatar";

type NavbarProfileDropdownProps = {
  user: User;
  onSignOut: () => void | Promise<void>;
};

const NavbarProfileDropdown = ({ user, onSignOut }: NavbarProfileDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="relative h-9 w-9 rounded-full p-0"
        aria-label="Open profile menu"
      >
        <UserProfileAvatar user={user} className="h-9 w-9" fallbackClassName="text-xs" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium">Account</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => void onSignOut()}
        className="text-destructive focus:text-destructive"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default NavbarProfileDropdown;
