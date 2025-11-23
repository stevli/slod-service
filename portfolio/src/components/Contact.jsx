import React, { useState } from 'react';
import Section from './Section';
import socials from '../data/socials.json';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong. Please try again later.');
        }
    };

    return (
        <Section id="contact" title="Get In Touch" subtitle="Let's build something amazing together" className="!py-16 md:!py-24 relative overflow-hidden bg-bg-muted">
            <div className="flex items-center justify-center w-full relative">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl mx-auto relative z-10">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col justify-center"
                    >
                        <h3 className="text-4xl font-bold text-text-main mb-6 tracking-tight">Let's start a conversation</h3>
                        <p className="text-text-muted text-lg mb-10 leading-relaxed">
                            I'm currently open to new opportunities and collaborations.
                            Whether you have a question, a project idea, or just want to say hello,
                            I'd love to hear from you.
                        </p>

                        <div className="space-y-8">
                            <a href={`mailto:${socials.email}`} className="flex items-center gap-4 group w-fit">
                                <div className="w-12 h-12 bg-bg-card border border-bg-muted rounded-xl flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300">
                                    <Mail className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                                </div>
                                <span className="text-lg text-text-main group-hover:text-primary transition-colors whitespace-nowrap">Email Me</span>
                            </a>

                            <div className="flex gap-4">
                                <a
                                    href={socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 bg-bg-card border border-bg-muted rounded-2xl flex items-center justify-center text-text-muted hover:text-white hover:bg-[#24292e] hover:border-transparent hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                                <a
                                    href={socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 bg-bg-card border border-bg-muted rounded-2xl flex items-center justify-center text-text-muted hover:text-white hover:bg-[#0077b5] hover:border-transparent hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-bg-card/50 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-xl dark:border-white/5"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-text-main ml-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-bg-main/50 border border-bg-muted focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-text-main placeholder:text-text-muted/50"
                                    placeholder="What's your name?"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-text-main ml-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-bg-main/50 border border-bg-muted focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-text-main placeholder:text-text-muted/50"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-text-main ml-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-5 py-4 rounded-xl bg-bg-main/50 border border-bg-muted focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-text-main resize-none placeholder:text-text-muted/50"
                                    placeholder="How can I help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 ${status === 'success'
                                    ? 'bg-green-500 hover:bg-green-600 shadow-green-500/25'
                                    : status === 'error'
                                        ? 'bg-red-500 hover:bg-red-600 shadow-red-500/25'
                                        : 'bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-primary/25'
                                    }`}
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        <CheckCircle className="w-5 h-5" /> Message Sent!
                                    </>
                                ) : status === 'error' ? (
                                    <>
                                        <XCircle className="w-5 h-5" /> Try Again
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" /> Send Message
                                    </>
                                )}
                            </button>

                            {status === 'error' && (
                                <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

export default Contact;
