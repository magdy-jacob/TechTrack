import React from 'react';
import {
    FiSettings,
    FiDatabase,
    FiSmartphone,
} from 'react-icons/fi';
import { FaReact } from "react-icons/fa";
import { LuPalette, LuBrainCircuit } from "react-icons/lu";
import { motion } from "framer-motion";

const tracks = [
    { name: 'DevOps', icon: <FiSettings className="w-10 h-10" /> },
    { name: 'UI/UX', icon: <LuPalette className="w-10 h-10" /> },
    { name: 'Frontend', icon: <FaReact className="w-10 h-10" /> },
    { name: 'Backend', icon: <FiDatabase className="w-10 h-10" /> },
    { name: 'Mobile Dev', icon: <FiSmartphone className="w-10 h-10" /> },
    { name: 'Data Science', icon: <LuBrainCircuit className="w-10 h-10" /> },
];

const Circles = () => {
    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center py-8 md:py-16">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-96 lg:h-96 rounded-full bg-primary-light/50" />
                </div>

                <motion.div
                    className="relative w-full h-full"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    whileInView={{ scale: 1.1 }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 2,
                        repeatType: "reverse",
                    }}
                    style={{ transformOrigin: 'center' }}
                >
                    {tracks.map((track, index) => {
                        const angle = index * 60 - 90;

                        const radius =
                            window.innerWidth >= 1024 ? 180 :  //  lg+
                                window.innerWidth >= 768 ? 150 :    //  md
                                    window.innerWidth >= 640 ? 120 :    //  sm
                                        110;     //  mobile

                        const x = radius * Math.cos(angle * Math.PI / 180);
                        const y = radius * Math.sin(angle * Math.PI / 180);

                        return (
                            <div
                                key={track.name}
                                className={`
                                    absolute 
                                    w-18 h-18 
                                    md:w-28 md:h-28 
                                    sm:w-20 sm:h-20 
                                    
                                    bg-white rounded-full shadow-lg 
                                    border-2 border-primary 
                                    flex flex-col items-center justify-center 
                                    text-center
                                `}
                                style={{
                                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                                    left: '50%',
                                    top: '50%',
                                }}
                            >
                                <motion.div
                                    className="flex flex-col items-center"
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    whileInView={{ scale: 1.1 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                        repeatType: "reverse",
                                    }}
                                    style={{ transformOrigin: 'center' }}
                                >
                                    <div className="text-primary mb-2">
                                        {React.cloneElement(track.icon, {
                                            className: `
                                                w-6 h-6 
                                                md:w-8 md:h-8 
                                                sm:w-7 sm:h-7 
                                                block
                                            `
                                        })}
                                    </div>
                                    <p className={`
                                        text-sm font-semibold text-secondary 
                                        md:text-xs 
                                        sm:text-[10px]
                                        text-[9px]
                                    `}>
                                        {track.name}
                                    </p>
                                </motion.div>
                            </div>
                        );
                    })}

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
                        <img
                            src="/assets/image/logo2.png"
                            alt="TechTrack Logo"
                            className="w-10 h-10 mb-3 md:w-12 md:h-12 sm:w-10 sm:h-10"
                        />
                        <h2 className="text-2xl font-bold text-secondary tracking-tight md:text-xl sm:text-lg">
                            TechTrack
                        </h2>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Circles;