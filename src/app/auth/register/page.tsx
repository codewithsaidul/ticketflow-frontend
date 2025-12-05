import RegisterForm from "@/components/modules/auth/RegisterForm";


export default function RegisterPage () {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center w-full">
      <div className="w-full container max-auto">
        <RegisterForm />
      </div>
    </div>
  )
}
