import { Spinner } from "@heroui/spinner"
import { useCurrentQuery } from "../../app/services/userApi"
import { ReactNode } from "react"

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner></Spinner>
  }
  return children
}
