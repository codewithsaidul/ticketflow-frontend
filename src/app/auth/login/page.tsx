import { LoginForm } from "@/components/modules/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="gradient-bg flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
