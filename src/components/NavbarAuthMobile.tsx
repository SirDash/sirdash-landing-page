import type { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfileAvatar from "@/components/UserProfileAvatar";

type NavbarAuthMobileProps = {
  user: User;
  onSignOut: () => void | Promise<void>;
};

const NavbarAuthMobile = ({ user, onSignOut }: NavbarAuthMobileProps) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <UserProfileAvatar user={user} className="h-10 w-10" fallbackClassName="text-sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          Signed in
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
      </div>
    </div>
    <Button
      variant="outline"
      className="w-full text-destructive hover:text-destructive"
      size="sm"
      onClick={() => void onSignOut()}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </Button>
  </div>
);

export default NavbarAuthMobile;
