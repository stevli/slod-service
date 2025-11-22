import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import profile from '../data/profile.json';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1.0]
            }
        },
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Parallax Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-6 text-center z-10">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div
                        variants={item}
                        className="mb-8 relative inline-block"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-bg-card shadow-xl overflow-hidden relative z-10 mx-auto">
                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transform scale-110 -z-10"></div>
                    </motion.div>

                    <motion.h2 variants={item} className="text-xl md:text-2xl text-primary font-medium mb-4">
                        Hello, I'm
                    </motion.h2>

                    <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-text-main">
                        {profile.name.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                                className="inline-block"
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.h3 variants={item} className="text-2xl md:text-4xl text-text-muted mb-8">
                        {profile.tagline}
                    </motion.h3>

                    <motion.p variants={item} className="text-text-muted max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
                        {profile.bio}
                    </motion.p>

                    <motion.div variants={item} className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <a
                            href="#projects"
                            className="px-8 py-3 bg-primary hover:bg-blue-600 text-white rounded-full font-medium transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-primary/25"
                        >
                            View Projects <ArrowRight size={20} />
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 border border-bg-muted hover:border-primary text-text-muted hover:text-primary rounded-full font-medium transition-all hover:bg-bg-muted"
                        >
                            Contact Me
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
