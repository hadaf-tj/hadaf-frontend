'use client';

import React, { useEffect, useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility is available based on previous file reads

const SplashScreen: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        // Check if splash screen has already been shown in this session
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

        if (hasSeenSplash) {
            setShouldRender(false);
            return;
        }

        // Mark as seen immediately so it doesn't show on reload if we wanted strict "once per tab"
        // However, the logic here is: Show on first load, then fade out.
        // If user reloads, hasSeenSplash will be true.
        sessionStorage.setItem('hasSeenSplash', 'true');

        // Sequence:
        // 1. Show (already visible by default)
        // 2. Wait a bit (e.g. 1.5s)
        // 3. Fade out
        // 4. Unmount

        const fadeTimer = setTimeout(() => {
            setOpacity(0);
        }, 2000); // Show for 2 seconds

        const unmountTimer = setTimeout(() => {
            setShouldRender(false);
        }, 2500); // Wait for fade out (0.5s transition)

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(unmountTimer);
        };
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[9999] flex items-center justify-center bg-[#1e3a8a] transition-opacity duration-500 ease-in-out",
            )}
            style={{ opacity }}
        >
            {/* Container with heartbeat animation */}
            <div className="flex flex-col items-center animate-heartbeat">
                <style jsx>{`
                    @keyframes heartbeat {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    .animate-heartbeat {
                        animation: heartbeat 3s ease-in-out infinite;
                    }
                `}</style>
                <div className="bg-white p-4 rounded-2xl shadow-2xl mb-4">
                    <HeartHandshake size={64} className="text-[#1e3a8a]" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-wide drop-shadow-lg">
                    Ҳадаф
                </h1>
            </div>
        </div>
    );
};

export default SplashScreen;
