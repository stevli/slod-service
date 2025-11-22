import React from 'react';
import ScrollReveal from './ScrollReveal';

const Section = ({ id, title, subtitle, children, className = '' }) => {
    return (
        <section id={id} className={`py-20 md:py-32 ${className}`}>
            <div className="container mx-auto px-6">
                {(title || subtitle) && (
                    <div className="mb-16 text-center flex flex-col items-center">
                        {title && (
                            <ScrollReveal width="100%">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-main">
                                    {title}
                                </h2>
                            </ScrollReveal>
                        )}
                        {subtitle && (
                            <ScrollReveal width="100%" delay={0.1}>
                                <p className="text-text-muted max-w-2xl mx-auto">{subtitle}</p>
                            </ScrollReveal>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
