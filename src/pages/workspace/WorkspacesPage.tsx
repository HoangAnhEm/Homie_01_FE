import { useState } from "react";
import type { Workspace } from "~/types/Workspace";

const workspaces = [
    {
        id: 1,
        title: "Title",
        date: "Ngày 44/4/4444",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
        image: "/images/ws1.jpg",
        files: 4,
    },
    {
        id: 2,
        title: "Title",
        date: "Ngày 44/4/4444",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
        image: "/images/ws2.jpg",
        files: 4,
    },
    {
        id: 3,
        title: "Title",
        date: "Ngày 44/4/4444",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
        image: "/images/ws3.jpg",
        files: 4,
    },
    {
        id: 4,
        title: "Title",
        date: "Ngày 44/4/4444",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
        image: "/images/ws4.jpg",
        files: 4,
    },
    {
        id: 5,
        title: "Title",
        date: "Ngày 44/4/4444",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
        image: "/images/ws5.jpg",
        files: 4,
    },
    {
        id: 6,
        title: "Title",
        date: "Ngày 44/4/4444",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
        image: "/images/ws6.jpg",
        files: 4,
    },
];

export default function WorkspacesPage() {
    const [tab, setTab] = useState("public");

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background image */}
            <img
                src="/main_bg.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover -z-10"
            />

            {/* Header */}
            <div className="flex items-center gap-1 mb-6">
                <img src="/logo.png" alt="Logo" className="w-20 h-20" />
                <span className="text-white font-medium text-2xl">Không gian làm việc</span>
            </div>

            <div className="px-[5%]">
                <div className="flex justify-between mb-10">
                    {/* Tabs */}
                    <div className="flex gap-2">
                        <button
                            className={`px-4 py-1 rounded-full font-semibold ${tab === "all"
                                ? "bg-white text-[#4B3B8F]"
                                : "bg-transparent text-white hover:bg-white/10"
                                }`}
                            onClick={() => setTab("all")}
                        >
                            Tất cả
                        </button>
                        <button
                            className={`px-4 py-1 rounded-full font-semibold ${tab === "public"
                                ? "bg-[#6C5DD3] text-white"
                                : "bg-transparent text-white hover:bg-white/10"
                                }`}
                            onClick={() => setTab("public")}
                        >
                            Công cộng
                        </button>
                    </div>

                    {/* Search */}
                    <div className="flex justify-end bg-white">
                        <div className="relative w-80">
                            <input
                                type="text"
                                placeholder="Search for files, plugins, and creators"
                                className="w-full rounded-full px-4 py-2 pr-10 outline-none"
                            />
                            <span className="absolute right-3 top-2.5 text-[#6C5DD3]">
                                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                                    <path d="M17 17L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="text-white font-normal text-2xl mb-4">
                    Không gian làm việc công cộng
                </div>

                {/* Workspace Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                    {workspaces.map((ws) => (
                        <WorkspaceCard workspace={ws} />
                    ))}
                </div>
            </div>
        </div>
    );
}


function WorkspaceCard({ workspace }: { workspace: Workspace }) {
    return (
        <div
            className="relative rounded-2xl overflow-hidden shadow-lg group"
            style={{ minHeight: 300 }}
        >
            <img
                src={workspace.image}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-4 flex flex-col h-full justify-between">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-white">{workspace.date}</span>
                    <span className="text-white flex items-center gap-1 text-xs">
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                            <path d="M2 2h12v12H2z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        {workspace.files}
                    </span>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <img src="/logo.png" alt="icon" className="w-5 h-5" />
                        <span className="text-white font-bold text-base">{workspace.title}</span>
                    </div>
                    <div className="text-white text-xs line-clamp-2">{workspace.desc}</div>
                </div>
            </div>
        </div>
    );
};