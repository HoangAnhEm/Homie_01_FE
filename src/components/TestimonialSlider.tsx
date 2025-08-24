import React, { useState, useEffect } from "react";
import type { Testimonial } from "~/types/Testimonial";

type Props = {
    testimonials: Testimonial[];
    intervalMs?: number;
};

export default function TestimonialSlider({ testimonials, intervalMs = 4000 }: Props) {
    const [active, setActive] = useState(0);
    const [nextActive, setNextActive] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, intervalMs);
        return () => clearInterval(timer);
    }, [active, intervalMs]);

    function handleNext() {
        const nextIdx = (active + 1) % testimonials.length;
        setDirection("right");
        setNextActive(nextIdx);
        setIsAnimating(true);
        setTimeout(() => {
            setActive(nextIdx);
            setNextActive(null);
            setIsAnimating(false);
        }, 400);
    }

    function handlePrev() {
        const prevIdx = (active - 1 + testimonials.length) % testimonials.length;
        setDirection("left");
        setNextActive(prevIdx);
        setIsAnimating(true);
        setTimeout(() => {
            setActive(prevIdx);
            setNextActive(null);
            setIsAnimating(false);
        }, 400);
    }

    function goTo(idx: number) {
        if (idx === active) return;
        setDirection(idx > active ? "right" : "left");
        setNextActive(idx);
        setIsAnimating(true);
        setTimeout(() => {
            setActive(idx);
            setNextActive(null);
            setIsAnimating(false);
        }, 400);
    }

    return (
        <div className="testimonial-slider-container flex flex-col items-center justify-center h-[50%] w-full">
            <div className="relative w-full h-full">
                {/* Testimonial hiện tại (trượt ra) */}
                <TestimonialItem
                    testimonial={testimonials[active]!}
                    animating={isAnimating}
                    direction={direction}
                    type={isAnimating ? "out" : "static"}
                />
                {/* Testimonial mới (trượt vào) */}
                {isAnimating && nextActive !== null && (
                    <TestimonialItem
                        testimonial={testimonials[nextActive]!}
                        animating={isAnimating}
                        direction={direction}
                        type="in"
                    />
                )}
            </div>
            {/* Dot indicators */}
            <div className="flex gap-1 justify-center">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Đến slide số ${i + 1}`}
                        className={`cursor-pointer w-2 h-2 rounded-full transition-all duration-200 mx-1 ${i === active ? "bg-black/70" : "bg-black/20"
                            }`}
                        style={{ outline: "none" }}
                        onClick={() => goTo(i)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

// Component hiển thị 1 testimonial với hiệu ứng
function TestimonialItem({
    testimonial,
    animating,
    direction,
    type,
}: {
    testimonial: Testimonial;
    animating?: boolean;
    direction?: "left" | "right";
    type?: "in" | "out" | "static";
}) {
    let className = "testimonial-slide absolute top-0 left-0 w-full transition-all duration-400";
    if (animating) {
        if (type === "in") {
            className += direction === "right" ? " slide-in-right" : " slide-in-left";
        } else if (type === "out") {
            className += direction === "right" ? " slide-out-left" : " slide-out-right";
        }
    } else {
        className += " opacity-100";
    }

    return (
        <div className={className}>
            <div className="flex items-center justify-center mb-8">
                {/* Avatar bên trái */}
                <img
                    src={testimonial.avatar}
                    alt="avatar"
                    className="w-16 h-16 rounded-full object-cover mr-6"
                />
                {/* Thông tin bên phải */}
                <div className="flex flex-col items-start">
                    <div className="font-bold text-lg mb-0">{testimonial.name}</div>
                    <div className="text-xs text-gray-500 -mt-1">{testimonial.role}</div>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={
                                    i < testimonial.rating ? "text-blue-500 text-xl" : "text-gray-300 text-xl"
                                }
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center text-[30px] text-black font-medium mb-8 leading-relaxed mx-auto">
                {testimonial.comment}
            </div>
        </div>
    );
}