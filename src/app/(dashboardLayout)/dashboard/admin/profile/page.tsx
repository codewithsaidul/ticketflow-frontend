import ProfileContent from "@/components/modules/user/profile-content";


export const metadata = {
    title: "Admin Profile - Settings",
};
export default function AdminProfilePage() {
    return (
        <div className="p-4 md:p-8">
            <ProfileContent /> 
        </div>
    );
}