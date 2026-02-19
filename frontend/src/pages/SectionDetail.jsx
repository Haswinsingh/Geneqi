import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../App';
import * as Icons from 'lucide-react';
import dashboardStructure from '../data/dashboardStructure.json';
import schemesData from '../data/schemes.json';
import { motion } from 'framer-motion';

const SectionDetail = () => {
    const { gender, sectionId } = useParams();
    const { t } = useContext(AppContext);

    const structure = dashboardStructure.find(s => s.category.toLowerCase() === gender.toLowerCase());
    const sectionInfo = structure?.sections.find(s => s.id === sectionId);

    // Get ALL schemes for this section
    const data = schemesData.find(s => s.category.toLowerCase() === gender.toLowerCase());
    const allSchemes = data?.schemes.filter(s => s.type === sectionId) || [];

    if (!sectionInfo) return <div className="text-center py-20">Section not found</div>;

    const IconComponent = Icons[sectionInfo.icon] || Icons.HelpCircle;

    return (
        <div className="container px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <Link to={`/dashboard/${gender}`} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white mb-6 transition-colors">
                    <Icons.ArrowLeft size={16} /> {t('Back to Dashboard')}
                </Link>

                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/20 text-primary">
                        <IconComponent size={32} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">{t(sectionInfo.title)}</h1>
                </div>
                <p className="text-xl text-text-muted max-w-2xl">
                    {t('Full list of available programs and resources.')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allSchemes.map((scheme, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -5 }}
                        className="glass-card hover:bg-white/5 cursor-pointer group flex flex-col justify-between"
                    >
                        <div>
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
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/5">
                            <a
                                href={scheme.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-bold flex items-center gap-1 text-white hover:underline decoration-primary underline-offset-4"
                            >
                                {t('Apply Now')} <Icons.ArrowRight size={14} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SectionDetail;
