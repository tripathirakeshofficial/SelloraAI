import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserProfileProps {
  name: string;
}

const UserProfile = ({ name }: UserProfileProps) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-indigo-100 text-xs font-medium text-indigo-600">
          {initials}
        </AvatarFallback>
      </Avatar>

      <span className="text-sm font-medium text-slate-700">{name}</span>
    </div>
  );
};

export default UserProfile;
