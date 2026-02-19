import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';
import axios from 'axios';
import { Search, Info, ExternalLink } from 'lucide-react';
import config from '../config';

const Scholarships = () => {
    const { t } = useContext(LanguageContext);
    const [filters, setFilters] = useState({
        age: 18,
        education: 'Undergraduate',
        income: 200000,
        gender: 'Female'
    });
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${config.API_URL}/api/scholarships/filter`, filters);
            setScholarships(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogClick = async (id) => {
        try {
            await axios.post(`${config.API_URL}/api/scholarships/click/${id}`, {
                gender: filters.gender,
                district: 'Anonymized'
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fade-in">
            <h2 className="text-3xl font-bold mb-8">Scholarship Eligibility Filter</h2>

            <div className="card mb-8">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Age</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            value={filters.age}
                            onChange={(e) => setFilters({ ...filters, age: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Education</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={filters.education}
                            onChange={(e) => setFilters({ ...filters, education: e.target.value })}
                        >
                            <option>10th</option>
                            <option>12th</option>
                            <option>Undergraduate</option>
                            <option>Graduate</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Annual Income (₹)</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded"
                            value={filters.income}
                            onChange={(e) => setFilters({ ...filters, income: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-primary h-10">
                        <Search size={18} /> {loading ? 'Searching...' : 'Find Match'}
                    </button>
                </form>
            </div>

            <div className="grid">
                {scholarships.map((s) => (
                    <div key={s._id} className="card fade-in">
                        <h3 className="text-xl font-bold text-primary mb-2">{s.name}</h3>
                        <p className="text-text-muted text-sm mb-4 line-clamp-2">{s.description}</p>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <Info size={14} className="text-secondary" />
                                <span>Income Limit: Under ₹{s.incomeLimit}</span>
                            </div>
                        </div>
                        <a
                            href={s.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLogClick(s._id)}
                            className="btn btn-primary w-full justify-center"
                        >
                            Apply Now <ExternalLink size={16} />
                        </a>
                    </div>
                ))}
            </div>

            {!loading && scholarships.length === 0 && (
                <div className="text-center py-12 text-text-muted">
                    Set your filters to find matching scholarships.
                </div>
            )}
        </div>
    );
};

export default Scholarships;
