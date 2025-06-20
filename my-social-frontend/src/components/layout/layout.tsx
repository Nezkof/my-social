import { Outlet } from "react-router-dom"
import { NavBar } from "../nav-bar/nav-bar"
import { Container } from "../container/container"
import { Header } from "../header/header"

export const Layout = () => {
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
