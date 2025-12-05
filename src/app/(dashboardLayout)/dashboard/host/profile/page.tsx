import ProfileContent from "@/components/modules/user/profile-content";


export const metadata = {
    title: "Host Profile - Settings",
};
export default function HostProfilePage() {
    return (
        <div className="p-4 md:p-8">
            <ProfileContent /> 
        </div>
    );
}