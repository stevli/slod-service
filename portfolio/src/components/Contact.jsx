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
        <Section id="contact" title="Get In Touch" subtitle="Have a question or want to work together?">
            <div className="min-h-[80vh] flex items-center justify-center w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col justify-center"
                    >
                        <h3 className="text-3xl font-bold text-text-main mb-6">Let's Chat!</h3>
                        <p className="text-text-muted text-lg mb-8 leading-relaxed">
                            I'm currently looking for new opportunities, my inbox is always open.
                            Whether you have a question, a project idea, or just want to say hi,
                            I'll try my best to get back to you!
                        </p>

                        <div className="space-y-6 mb-12">
                            <a href={`mailto:${socials.email}`} className="flex items-center gap-4 text-text-muted hover:text-primary transition-colors group">
                                <div className="w-12 h-12 bg-bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <span className="text-lg font-medium">{socials.email}</span>
                            </a>
                            <div className="flex gap-4 mt-4">
                                <a
                                    href={socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-bg-muted rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-gray-900 transition-all"
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                                <a
                                    href={socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-bg-muted rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-[#0077b5] transition-all"
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
                        className="bg-bg-card p-8 rounded-2xl border border-bg-muted shadow-xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-main mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-bg-muted border border-transparent focus:border-primary focus:bg-bg-main focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-main"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-main mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-bg-muted border border-transparent focus:border-primary focus:bg-bg-main focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-main"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-bg-muted border border-transparent focus:border-primary focus:bg-bg-main focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-main resize-none"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className={`w-full py-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${status === 'success'
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : status === 'error'
                                            ? 'bg-red-500 hover:bg-red-600'
                                            : 'bg-primary hover:bg-blue-600'
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
