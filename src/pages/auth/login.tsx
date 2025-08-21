export default function Login() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Login to My App</h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => alert('Bạn đã bấm nút Login')}
        >
          Login
        </button>
      </div>
    );
  }
  