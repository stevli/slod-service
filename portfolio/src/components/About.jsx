import React from 'react';
import Section from './Section';
import profile from '../data/profile.json';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <Section id="about" title="About Me" className="bg-bg-muted">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-bg-card rounded-2xl p-8 border border-bg-muted shadow-xl">
                            <p className="text-text-muted leading-relaxed text-lg">
                                {profile.about}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2 grid grid-cols-2 gap-6"
                >
                    <div className="p-6 bg-bg-card/50 rounded-xl border border-bg-muted hover:border-primary/50 transition-colors shadow-sm">
                        <h3 className="text-4xl font-bold text-primary mb-2">3+</h3>
                        <p className="text-text-muted">Years Experience</p>
                    </div>
                    <div className="p-6 bg-bg-card/50 rounded-xl border border-bg-muted hover:border-secondary/50 transition-colors shadow-sm">
                        <h3 className="text-4xl font-bold text-secondary mb-2">10+</h3>
                        <p className="text-text-muted">Projects Completed</p>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default About;
