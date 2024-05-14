import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import EventRegisterPage from "./pages/EventRegisterPage.jsx";
import ParticipantsPage from "./pages/ParticipantsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/register/:id",
        element: <EventRegisterPage/>
    },
    {
        path: "/participants/:id",
        element: <ParticipantsPage/>
    },
    {
        path:'*',
        element: <NotFoundPage/>
    }
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
