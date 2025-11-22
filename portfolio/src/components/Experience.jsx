import React from 'react';
import Section from './Section';
import experience from '../data/experience.json';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = () => {
    return (
        <Section id="experience" title="Work Experience" subtitle="My professional journey so far.">
            <div className="relative max-w-4xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-bg-muted"></div>

                <div className="space-y-12">
                    {experience.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-bg-main z-10 mt-1.5 md:mt-0 shadow-md"></div>

                            {/* Content */}
                            <div className="ml-8 md:ml-0 md:w-1/2 md:px-8">
                                <div className="bg-bg-card p-6 rounded-xl border border-bg-muted hover:border-primary/30 transition-colors shadow-lg">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            {job.logo && (
                                                <div className="w-12 h-12 rounded-lg bg-white p-1 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-contain" />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-xl font-bold text-text-main leading-tight">{job.role}</h3>
                                                <div className="flex items-center text-primary mt-1">
                                                    <Briefcase size={14} className="mr-1.5" />
                                                    <span className="text-sm font-medium">{job.company}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-text-muted text-xs font-medium bg-bg-muted px-3 py-1 rounded-full whitespace-nowrap ml-2">
                                            <Calendar size={12} className="mr-1.5" />
                                            {job.period}
                                        </div>
                                    </div>

                                    <p className="text-text-muted mb-4 text-sm leading-relaxed">{job.description}</p>
                                    <ul className="space-y-2">
                                        {job.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start text-text-muted text-sm">
                                                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Experience;
