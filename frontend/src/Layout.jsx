import {Outlet} from "react-router"
import {Toaster} from "react-hot-toast"
import Navbar from "./components/Navbar"
import background from "./assets/wheres-waldo-beach.jpeg"

export default function Layout() {
    return(
        <div className="relative min-h-screen">
            <div className="absolute inset-0 -z-10 bg-cover grayscale opacity-15" style={{backgroundImage: `url(${background})`, backgroundSize: "200%"}}></div>
            <main>
                <Navbar />
                <Outlet />
                <Toaster />
            </main>
            
        </div>
    )
}