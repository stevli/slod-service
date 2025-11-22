import React from 'react';
import Section from './Section';
import projects from '../data/projects.json';
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
    return (
        <Section id="projects" title="Featured Projects" subtitle="Some of the things I've built.">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ScrollReveal key={project.id} delay={index * 0.1}>
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="group bg-bg-card rounded-xl overflow-hidden border border-bg-muted hover:border-primary transition-colors duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full relative"
                        >
                            {/* Glass Reflection Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>

                            {/* Image Container */}
                            <div className="relative aspect-video overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.7 }}
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow relative z-10">
                                <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-text-muted mb-6 flex-grow text-sm leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-bg-muted">
                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-sm text-text-muted hover:text-text-main transition-colors"
                                        >
                                            <Github size={16} className="mr-1" /> Code
                                        </a>
                                    )}
                                    {project.links.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-sm text-primary hover:text-blue-400 transition-colors"
                                        >
                                            <ExternalLink size={16} className="mr-1" /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </ScrollReveal>
                ))}
            </div>
        </Section>
    );
};

export default Projects;
