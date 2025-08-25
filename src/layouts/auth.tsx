import TestimonialSlider from "~/components/TestimonialSlider";
import { BrandName } from "~/constants/common";
import { testimonials } from "~/constants/testimonials";
import type { ReactNode } from 'react';

export default function AuthenLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen flex items-center justify-center relative">
            {/* Logo và BrandName góc trên bên trái */}
            <div className="absolute top-6 left-8 flex items-center gap-2 z-50">
                <img src="/logo.png" alt="Logo BrandName" className="w-12 h-12 object-contain" />
                <span className="font-bold text-xl text-black drop-shadow">{BrandName}</span>
            </div>
            {/* Cột trái: Testimonial */}
            <div className="hidden md:flex flex-col justify-center items-center h-full w-52/100 bg-[#EEECEC] px-8 py-12">
                <div className="hidden md:flex flex-col justify-center items-center h-full w-3/4 bg-[#EEECEC] px-8 py-12 overflow-x-hidden">
                    <TestimonialSlider testimonials={testimonials} />
                </div>
            </div>
            {/* Cột phải: Nội dung truyền vào */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center min-h-screen">
                {children}
            </div>
        </div>
    );
}

