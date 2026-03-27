import type { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserAvatarUrl, profileInitials } from "@/lib/authUtils";
import { cn } from "@/lib/utils";

type UserProfileAvatarProps = {
  user: User;
  className?: string;
  fallbackClassName?: string;
};

const UserProfileAvatar = ({
  user,
  className,
  fallbackClassName,
}: UserProfileAvatarProps) => {
  const avatarUrl = getUserAvatarUrl(user);

  return (
    <Avatar
      className={cn(
        "border border-sirdash-200 dark:border-sirdash-700",
        className
      )}
    >
      {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
      <AvatarFallback
        className={cn(
          "bg-sirdash-100 text-sirdash-800 font-medium dark:bg-sirdash-900 dark:text-sirdash-200",
          fallbackClassName
        )}
      >
        {profileInitials(user)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserProfileAvatar;
