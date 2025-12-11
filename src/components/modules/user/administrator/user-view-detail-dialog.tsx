import InfoRow from "@/components/shared/info-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IUser, UserRole } from "@/types/user.types";
import { getInitialsName } from "@/utils";
import { formatDate } from "@/utils/formatter";
import {
  Calendar,
  LocateIcon,
  Mail,
  MapPin,
  Phone,
  Tag,
  User,
} from "lucide-react";

interface IUserViewDialogProps {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
}

const UserViewDetailDialog = ({
  open,
  onClose,
  user,
}: IUserViewDialogProps) => {
  if (!user) {
    return null;
  }

  // Role এর উপর ভিত্তি করে Header Color
  const getHeaderColor = (role: string) => {
    switch (role) {
      case UserRole.SUPERADMIN:
        return "from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950";
      case UserRole.ADMIN:
        return "from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950";
      case UserRole.HOST:
        return "from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950";
      default:
        return "from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* User Profile Header */}
          <div
            className={`flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br ${getHeaderColor(
              user.role
            )} rounded-lg mb-6`}
          >
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={user?.profileImg} alt={user?.name} />
              <AvatarFallback className="text-2xl">
                {getInitialsName(user?.name || "")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{user?.name}</h2>
              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {user?.email}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge
                  variant={
                    user?.status === "inactive" ? "destructive" : "default"
                  }
                  className="text-sm uppercase"
                >
                  {user?.status}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-sm uppercase ${
                    user.role === "admin"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : ""
                  }`}
                >
                  {user?.role}
                </Badge>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="space-y-6">
            {/* Social & Interest Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Social & Interests</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3 md:col-span-2">
                  <User className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Bio / About Me"
                    value={user?.bio || "No bio provided."}
                  />
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <LocateIcon className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Interests"
                    value={
                      user?.interests && user.interests.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {user.interests.map((interest, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        "No interests listed."
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Contact Number"
                    value={user?.phone || "Not provided"}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Email"
                    value={user?.email || "Not provided"}
                  />
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Location (City/Area)"
                    value={user?.location || "Not specified"}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Account Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Joined On"
                    value={formatDate(user?.createdAt || "")}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <InfoRow
                    label="Last Updated"
                    value={formatDate(user?.updatedAt || "")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserViewDetailDialog;
