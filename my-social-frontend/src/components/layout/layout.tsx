import { Outlet, useNavigate } from "react-router-dom"
import { NavBar } from "../nav-bar/nav-bar"
import { Container } from "../container/container"
import { Header } from "../header/header"
import {
  selectIsAuthentificated,
  selectUser,
} from "../../features/user/userSlices"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export const Layout = () => {
  const isAutherntificated = useSelector(selectIsAuthentificated)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAutherntificated) {
      navigate("/auth")
    }
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <NavBar></NavBar>
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
    </>
  )
}
