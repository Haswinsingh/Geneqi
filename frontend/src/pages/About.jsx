import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import * as Icons from 'lucide-react';

const About = () => {
    return (
        <div className="container px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto text-center mb-16"
            >
                <div className="inline-block p-4 rounded-full bg-primary/20 text-primary mb-6">
                    <Icons.Shield size={48} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
                <p className="text-xl text-text-muted leading-relaxed">
                    Geneqi aims to bridge the gap between resources and the people who need them most. We believe in equal opportunity for everyone, regardless of gender.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="glass-card p-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-6">
                        <Icons.User size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">For Men</h3>
                    <p className="text-text-muted">Providing career guidance, mental health support, and skill development schemes tailored to men's needs.</p>
                </div>
                <div className="glass-card p-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center mb-6">
                        <Icons.Users size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">For Women</h3>
                    <p className="text-text-muted">Empowering women with maternity benefits, safety laws, scholarships, and entrepreneurship grants.</p>
                </div>
                <div className="glass-card p-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-6">
                        <Icons.UserPlus size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">For Transgender</h3>
                    <p className="text-text-muted">Ensuring inclusive healthcare, legal identity recognition, and livelihood support for the transgender community.</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto"
            >
                <h2 className="text-3xl font-bold mb-6">Why Geneqi?</h2>
                <p className="text-lg text-text-muted mb-8">
                    In a world of information overload, finding the right government scheme or legal help can be overwhelming. Geneqi centralizes this data, verifies it, and presents it in a user-friendly way.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/" className="btn btn-primary">
                        Explore Dashboard
                    </Link>
                    <Link to="/contact" className="btn btn-glass">
                        Contact Us
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
