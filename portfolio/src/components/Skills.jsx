import React from 'react';
import Section from './Section';
import skills from '../data/skills.json';
import { motion } from 'framer-motion';

const SkillCategory = ({ title, items, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-bg-card p-6 rounded-xl border border-bg-muted shadow-lg"
    >
        <h3 className="text-xl font-bold text-text-main mb-4 border-b border-bg-muted pb-2">{title}</h3>
        <div className="flex flex-wrap gap-3">
            {items.map((skill) => (
                <div
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-1.5 bg-bg-muted rounded-full hover:bg-primary/10 hover:ring-1 hover:ring-primary/50 transition-all cursor-default group"
                >
                    <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
                    <span className="text-text-muted text-sm font-medium group-hover:text-primary transition-colors">
                        {skill.name}
                    </span>
                </div>
            ))}
        </div>
    </motion.div>
);

const Skills = () => {
    return (
        <Section id="skills" title="Technical Skills" subtitle="My technical expertise and tools I use." className="bg-bg-muted">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SkillCategory title="Languages" items={skills.languages} delay={0} />
                <SkillCategory title="Cloud Platforms" items={skills.cloud} delay={0.1} />
                <SkillCategory title="DevOps & Tools" items={skills.devops} delay={0.2} />
                <SkillCategory title="Big Data" items={skills.bigData} delay={0.3} />
            </div>
        </Section>
    );
};

export default Skills;
