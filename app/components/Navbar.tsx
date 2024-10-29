import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Event Management</h1>
      <div className="flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}
