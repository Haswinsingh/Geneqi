import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { User, Users, UserPlus, HeartHandshake, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const { t, user } = useContext(AppContext);

    // Use user from AppContext directly for faster initial render if available
    // Also keeping local check for redundancy if context is slow to hydrate (though context should be fast)
    const isAuthenticated = !!user || !!localStorage.getItem('token');

    const genderCategories = [
        {
            id: 'Male',
            title: t('male'),
            desc: 'Find career mentorship, skill development, and health schemes.',
            icon: <User size={48} strokeWidth={1.5} />,
            color: 'male',
            path: '/dashboard/Male'
        },
        {
            id: 'Female',
            title: t('female'),
            desc: 'Access scholarships, maternity benefits, and women empowerment grants.',
            icon: <Users size={48} strokeWidth={1.5} />,
            color: 'female',
            path: '/dashboard/Female'
        },
        {
            id: 'Others',
            title: t('others'),
            desc: 'Inclusive healthcare, legal rights, and specialized livelihood support.',
            icon: <UserPlus size={48} strokeWidth={1.5} />,
            color: 'others',
            path: '/dashboard/Others'
        }
    ];

    // Simplified variants to ensure visibility
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (!isAuthenticated) {
        // SDG 5 Intro Animation View
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden">
                {/* Background Animation - Abstract Equality */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-1000"></div>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="text-center z-10"
                >
                    {/* Animated Icon */}
                    <div className="inline-block mb-6 relative">
                        <motion.div
                            initial={{ rotate: -10 }}
                            animate={{ rotate: 10 }}
                            transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
                        >
                            <Scale size={80} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                        </motion.div>
                        <motion.div
                            className="absolute -top-2 -right-2 text-red-500"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <HeartHandshake size={32} />
                        </motion.div>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        Geneqi
                    </h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1, duration: 1 }}
                        className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-6 max-w-sm"
                    />

                    <p className="text-xl md:text-2xl text-red-400 font-bold mb-8 uppercase tracking-widest">
                        SDG 5: Gender Equality
                    </p>

                    <p className="text-text-muted max-w-lg mx-auto mb-10 leading-relaxed">
                        Empowering all genders through equal access to resources, opportunities, and protection.
                    </p>

                    <Link to="/login" className="btn btn-primary px-8 py-3 text-lg rounded-full shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all">
                        Join the Movement
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container px-4">
            <section className="text-center py-16 md:py-24 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                >
                    {t('heroTitle')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-text-muted mb-12 max-w-2xl mx-auto"
                >
                    {t('heroSub')}
                </motion.p>
            </section>

            {/* Removing 'initial' and 'animate' props from the parent div temporarily to ensure visibility.
                Using simple className based grid.
                If animation is critical, we can re-add step-by-step.
                Currently prioritizing visibility.
            */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
                {genderCategories.map((cat, index) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link to={cat.path} className={`glass-card gender-card ${cat.color} group block h-full`}>
                            <div className="icon-box bg-white/5 text-white/80 group-hover:text-white group-hover:bg-white/20 transition-all duration-300 mx-auto">
                                {cat.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                            <p className="text-text-muted text-sm mb-6 max-w-[200px] mx-auto group-hover:text-white/90 transition-colors">
                                {cat.desc}
                            </p>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 block">
                                Explore Dashboard →
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Home;
