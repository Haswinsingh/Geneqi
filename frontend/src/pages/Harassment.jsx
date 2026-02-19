import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, Scale, PhoneCall, ArrowRight } from 'lucide-react';
import config from '../config';

const Harassment = () => {
    const [category, setCategory] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const categories = [
        { id: 'Workplace', icon: <Scale />, title: 'Workplace Harassment' },
        { id: 'Cyber', icon: <ShieldCheck />, title: 'Cyber Harassment' },
        { id: 'Domestic Violence', icon: <Scale />, title: 'Domestic Violence' },
        { id: 'Child Protection', icon: <Scale />, title: 'Child Protection' }
    ];

    const fetchGuidance = async (cat) => {
        setLoading(true);
        setCategory(cat);
        try {
            const res = await axios.get(`${config.API_URL}/api/harassment/${cat}`);
            setData(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in">
            <h2 className="text-3xl font-bold mb-4">Harassment Support & Legal Guidance</h2>
            <p className="text-text-muted mb-8">Select a category to understand your rights and the legal steps you can take.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {categories.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => fetchGuidance(c.id)}
                        className={`card flex flex-col items-center gap-3 p-6 transition-all ${category === c.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-primary'}`}
                    >
                        <div className={`p-3 rounded-full ${category === c.id ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                            {c.icon}
                        </div>
                        <span className="font-bold text-center text-sm">{c.title}</span>
                    </button>
                ))}
            </div>

            {loading && <div className="text-center">Loading guidance...</div>}

            {data && !loading && (
                <div className="fade-in space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card bg-accent text-white border-none">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Scale size={20} /> Legal Rights
                            </h3>
                            <p className="opacity-90">{data.rightsSummary}</p>
                            <div className="mt-4 p-3 bg-white/10 rounded-lg text-sm italic">
                                <strong>Applicable Law:</strong> {data.applicableLaw}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                                <ShieldCheck size={20} /> Filing a Complaint
                            </h3>
                            <ul className="space-y-3">
                                {data.procedure.map((step, idx) => (
                                    <li key={idx} className="flex gap-3 text-sm">
                                        <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">{idx + 1}</span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="card border-primary bg-primary/5 text-center py-10">
                        <h3 className="text-2xl font-bold mb-4">Ready to take action?</h3>
                        <p className="text-text-muted mb-6">Contact the official support helpline or portal for assistance.</p>
                        <a
                            href={data.contactLink}
                            target="_blank"
                            className="btn btn-primary lg"
                            onClick={async () => {
                                await axios.post(`${config.API_URL}/api/harassment/referral/${data._id}`, {
                                    gender: 'Prefer not to say',
                                    district: 'Anonymized'
                                });
                            }}
                        >
                            <PhoneCall size={20} /> Access Support Portal
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Harassment;
