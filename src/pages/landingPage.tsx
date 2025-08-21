import Link from 'next/link';

export default function LandPage() {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to My App</h1>
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/signUp"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Signup
          </Link>
        </div>
      </>
    );
  }
