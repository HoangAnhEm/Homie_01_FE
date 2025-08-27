import { BrandName } from '../constants/common';
import { useRouter } from 'next/router';

export default function LandingPage() {
  const router = useRouter();

  const logIn = () => {
    console.log("logIn clicked")
    router.push('/auth/login');
  }

  const signUp = () => {
    console.log("signUp clicked")
    router.push('/auth/signUp');
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center px-12 py-6 absolute left-0 top-0 w-full z-10">
        <div className="flex items-center gap-2">
          {/* Logo (dùng emoji tạm, thay bằng Image nếu bạn có asset) */}
          <img src="/logo.png" alt="Logo BrandName" className="w-10 h-10 object-contain" />
          <span className="font-bold text-xl text-white drop-shadow">{BrandName}</span>
        </div>
        <div className="flex gap-6 font-bold text-white drop-shadow">
          <button className="bg-transparent hover:underline">Button</button>
          <button className="bg-transparent hover:underline">Button</button>
          <button className="bg-transparent hover:underline">Button</button>
          <button className="bg-transparent hover:underline">Button</button>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 font-semibold bg-white text-black rounded-lg shadow hover:bg-gray-200 transition cursor-pointer"
            onClick={logIn}>
            Đăng nhập
          </button>
          <button className="px-4 py-2 font-semibold bg-black text-white rounded-lg shadow hover:bg-gray-800 transition cursor-pointer"
            onClick={signUp}>
            Đăng ký
          </button>
        </div>
      </div>

      {/* Background ảnh + nội dung chính */}
      <div className="relative w-full flex-1 flex flex-col justify-center items-center bg-black/50">
        {/* Vid nền */}
        <div className="absolute inset-0 z-0">
          <video
            src="/bg.mp4"
            className="w-full h-full object-cover opacity-80"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay mờ */}
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
        {/* Nội dung */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            Học tập hiệu quả với AI
          </h1>
          <p className="text-lg md:text-2xl text-white font-medium mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            Chủ động học tập với tài liệu của bạn – Hỏi đáp AI và luyện tập không giới hạn.
          </p>
        </div>
      </div>

      {/* Section giới thiệu tính năng */}
      <div className="w-full bg-[#F8F1F1] rounded-t-3xl -mt-10 shadow-lg z-20 relative">
        <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-stretch">
          {/* Card 1 */}
          <div className="flex flex-col flex-1 items-center text-center">
            <span className="bg-[#D5CBCB] rounded-full w-14 h-14 flex items-center justify-center mb-4 text-2xl">📎</span>
            <h3 className="font-bold text-xl mb-2">Tải, tra cứu tài liệu</h3>
            <p className="text-gray-700">Quản lý và truy cập tài liệu học tập dễ dàng.</p>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col flex-1 items-center text-center">
            <span className="bg-[#D5CBCB] rounded-full w-14 h-14 flex items-center justify-center mb-4 text-2xl">💬</span>
            <h3 className="font-bold text-xl mb-2">Hỏi đáp tài liệu với AI</h3>
            <p className="text-gray-700">Nhận giải đáp tự động từ AI dựa trên nội dung tài liệu.</p>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col flex-1 items-center text-center">
            <span className="bg-[#D5CBCB] rounded-full w-14 h-14 flex items-center justify-center mb-4 text-2xl">✍️</span>
            <h3 className="font-bold text-xl mb-2">Sinh câu hỏi tự động</h3>
            <p className="text-gray-700">AI tạo câu hỏi luyện tập từ tài liệu đã tải lên.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
