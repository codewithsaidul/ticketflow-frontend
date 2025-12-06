"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMeQuery } from "@/redux/api/authApi/authApi";
import { IUser } from "@/types";
import {
  CalendarDays,
  Edit,
  Loader2,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

export default function ProfileContent() {
  const { data, isLoading } = useGetMeQuery(undefined);
  console.log("🚀 ~ ProfileContent ~ data:", data)
  const user = data?.data as IUser;
  console.log("🚀 ~ ProfileContent ~ user:", user)

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-10">
      <div className="h-48 w-full bg-linear-to-r from-primary/80 to-purple-600/80 relative">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🔥 LEFT SIDE: IDENTITY CARD */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-primary/10 text-center overflow-hidden">
              <CardContent className="pt-8 pb-8 flex flex-col items-center">
                {/* Avatar with Ring */}
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage
                      src={user?.profileImg}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-background ${
                      user?.status === "active"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  />
                </div>

                <h2 className="text-2xl font-bold font-heading">
                  {user?.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-3">
                  {user?.email}
                </p>

                <div className="flex gap-2 mb-6">
                  <Badge
                    variant="secondary"
                    className="uppercase tracking-wider font-bold px-3"
                  >
                    {user?.role}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      user?.status === "active"
                        ? "text-green-600 border-green-200"
                        : "text-yellow-600 border-yellow-200"
                    }
                  >
                    {user?.status?.toUpperCase()}
                  </Badge>
                </div>

                <div className="w-full space-y-2">
                  {/* Edit Profile Button (Mock Link) */}
                  <Button className="w-full gap-2" variant="outline">
                    <Edit className="w-4 h-4" /> Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats (Optional) */}
            <Card className="mt-6 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 🔥 RIGHT SIDE: DETAILS TABS */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start bg-card p-1 border h-auto">
                <TabsTrigger value="overview" className="px-6 py-2.5">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="settings" className="px-6 py-2.5">
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Overview */}
              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* Bio Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" /> About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {user?.bio || "This user hasn't written a bio yet."}
                    </p>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem icon={Mail} label="Email" value={user?.email} />
                    <InfoItem
                      icon={Phone}
                      label="Phone"
                      value={user?.phone || "N/A"}
                    />
                    <InfoItem
                      icon={MapPin}
                      label="Location"
                      value={user?.location || "N/A"}
                    />
                    <InfoItem
                      icon={CalendarDays}
                      label="Joined"
                      value={new Date(user?.createdAt).toDateString()}
                    />
                  </CardContent>
                </Card>

                {/* Interests */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">
                      Interests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user?.interests && user.interests.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1"
                          >
                            # {interest}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm italic">
                        No interests added.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab 2: Settings / Edit Form */}
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Edit profile form will go here... (You can reuse your
                      RegisterForm logic)
                    </p>
                    {/* এখানে আপনার EditProfileForm কম্পোনেন্ট বসাবেন */}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Info Items
function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
