import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"

import { HeroUIProvider } from "@heroui/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider/theme-provider"
import { Layout } from "./components/layout/layout"
import { Auth } from "./pages/auth/auth"
import { UserProfile } from "./pages/user-profile/user-profile"
import { Followers } from "./pages/followers"
import { CurrentPost } from "./pages/current-post/current-post"
import { Following } from "./pages/following"
import { Posts } from "./pages/posts/posts"
import { AuthGuard } from "./features/user/authGuard"

const container = document.getElementById("root")
const router = createBrowserRouter([
  {
    path: `/auth`,
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <CurrentPost />,
      },
      {
        path: "users/:id",
        element: <UserProfile />,
      },
      {
        path: "followers",
        element: <Followers />,
      },
      {
        path: "following",
        element: <Following />,
      },
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <HeroUIProvider>
          <ThemeProvider>
            <AuthGuard>
              <RouterProvider router={router}></RouterProvider>
            </AuthGuard>
          </ThemeProvider>
        </HeroUIProvider>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
