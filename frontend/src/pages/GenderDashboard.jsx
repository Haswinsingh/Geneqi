import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../App';
import * as Icons from 'lucide-react';
import dashboardStructure from '../data/dashboardStructure.json';
import schemesData from '../data/schemes.json';
import { motion } from 'framer-motion';

const GenderDashboard = () => {
    const { gender } = useParams();
    const { t } = useContext(AppContext);

    // Filter structure and data based on gender parameter
    const structure = dashboardStructure.find(s => s.category.toLowerCase() === gender.toLowerCase());
    const data = schemesData.find(s => s.category.toLowerCase() === gender.toLowerCase());

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    if (!structure) return <div className="text-center py-20 text-text-muted">{t('Dashboard not found for')} {t(gender.toLowerCase())}</div>;

    return (
        <div className="container px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary uppercase text-xs font-bold tracking-widest mb-4">
                    {t(gender.toLowerCase())} {t('Dashboard')}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('Empowering')} <span className="gradient-text">{t(gender.toLowerCase())}</span></h1>
                <p className="text-xl text-text-muted max-w-2xl mx-auto">
                    {t('Curated resources')}
                </p>
            </motion.div>

            <div className="space-y-32">
                {structure.sections.map((section, index) => {
                    const IconComponent = Icons[section.icon] || Icons.HelpCircle;
                    // Filter schemes for this specific section
                    const allSectionSchemes = data?.schemes.filter(s => s.type === section.id) || [];

                    // Show only the first 2 items
                    const displayedSchemes = allSectionSchemes.slice(0, 2);
                    const hasMore = allSectionSchemes.length > 2;

                    return (
                        <motion.section
                            key={section.id}
                            id={section.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={sectionVariants}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-6">
                                <div className="p-3 rounded-xl bg-white/5 text-primary">
                                    <IconComponent size={32} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{t(section.title)}</h2>
                                    <p className="text-sm text-text-muted">{t(section.desc)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Featured Content (First 2 Only) */}
                                {displayedSchemes.map((scheme, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="glass-card hover:bg-white/5 cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded">
                                                {t('VERIFIED')}
                                            </span>
                                            <Icons.ExternalLink size={16} className="text-text-muted group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{t(scheme.title)}</h3>
                                        <p className="text-sm text-text-muted mb-6 leading-relaxed">
                                            {t(scheme.desc)}
                                        </p>
                                        <a
                                            href={scheme.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm font-bold flex items-center gap-1 text-white hover:underline decoration-primary underline-offset-4"
                                        >
                                            {t('Apply Now')} <Icons.ArrowRight size={14} />
                                        </a>
                                    </motion.div>
                                ))}

                                {/* 'View All' Card - Only shown if there are more than 2 items */}
                                {hasMore && (
                                    <Link
                                        to={`/dashboard/${gender}/${section.id}`}
                                        className="glass-card flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity min-h-[200px] border-dashed group"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                            <Icons.Plus size={24} className="text-white" />
                                        </div>
                                        <h4 className="font-bold mb-1">{t('View All')} {t(section.title)}</h4>
                                        <p className="text-xs text-text-muted">
                                            +{allSectionSchemes.length - 2} more programs available
                                        </p>
                                    </Link>
                                )}

                                {/* Empty State */}
                                {allSectionSchemes.length === 0 && (
                                    <div className="col-span-full py-12 text-center glass-card border-dashed opacity-50">
                                        <Icons.SearchX className="mx-auto mb-3" size={32} />
                                        <p>{t('No specific schemes found for this category yet.')}</p>
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    );
                })}
            </div>
        </div>
    );
};

export default GenderDashboard;
