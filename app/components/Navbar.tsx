import Link from "next/link";
import LoginButton from "./User/LoginButton";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Event Management</h1>
      <div className="flex space-x-4">
       
        <span className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium">
        <Link href="/">Home</Link>
        </span>
         <LoginButton />
      </div>
    </nav>
  );
}
