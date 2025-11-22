import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import socials from '../data/socials.json';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <div className="min-h-screen bg-bg-main text-text-main selection:bg-primary selection:text-white transition-colors duration-300">
            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-main/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <a href="#" className="text-2xl font-bold text-text-main">
                        Steven Li
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            className="text-text-muted hover:text-text-main"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-bg-main/95 backdrop-blur-md border-t border-bg-muted p-6 shadow-xl">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-text-muted hover:text-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-bg-muted py-12 border-t border-bg-muted transition-colors duration-300">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                        <p className="text-text-muted text-sm">
                            © {new Date().getFullYear()} Steven Li. All rights reserved.
                        </p>
                    </div>
                    <div className="flex space-x-6">
                        <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                            <Github size={20} />
                        </a>
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href={socials.email} className="text-text-muted hover:text-primary transition-colors">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
