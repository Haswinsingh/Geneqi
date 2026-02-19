import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LayoutDashboard, Users, MousePointer2, MapPin, Download } from 'lucide-react';
import config from '../config';

const Admin = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await axios.get(`${config.API_URL}/api/admin/metrics`);
                setMetrics(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    const exportCSV = () => {
        // Simple CSV implementation
        const headers = "Category,Value\n";
        const rows = [
            `Scholarship Clicks,${metrics.totalScholarshipClicks}`,
            `Harassment Referrals,${metrics.totalHarassmentReferrals}`,
            ...metrics.genderDist.map(g => `Gender ${g._id},${g.count}`),
            ...metrics.districtDist.map(d => `District ${d._id},${d.count}`)
        ].join("\n");

        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `geneqi_metrics_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    if (loading) return <div className="text-center py-20">Loading Dashboard...</div>;

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                    <LayoutDashboard size={32} className="text-primary" /> Admin Analytics
                </h2>
                <button onClick={exportCSV} className="btn btn-outline flex items-center gap-2">
                    <Download size={18} /> Export CSV
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="card text-center border-l-4 border-primary">
                    <MousePointer2 className="mx-auto mb-2 text-primary" size={24} />
                    <div className="text-3xl font-bold">{metrics.totalScholarshipClicks}</div>
                    <div className="text-text-muted text-sm uppercase font-semibold">Scholarship Clicks</div>
                </div>
                <div className="card text-center border-l-4 border-red-500">
                    <Users className="mx-auto mb-2 text-red-500" size={24} />
                    <div className="text-3xl font-bold">{metrics.totalHarassmentReferrals}</div>
                    <div className="text-text-muted text-sm uppercase font-semibold">Harassment Referrals</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <Users size={20} className="text-primary" /> Gender Distribution
                    </h3>
                    <div className="space-y-4">
                        {metrics.genderDist.map(g => (
                            <div key={g._id}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{g._id || 'Unknown'}</span>
                                    <span>{g.count}</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-primary h-full"
                                        style={{ width: `${(g.count / (metrics.totalScholarshipClicks + metrics.totalHarassmentReferrals) * 100) || 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <MapPin size={20} className="text-primary" /> Reach by District
                    </h3>
                    <div className="space-y-4">
                        {metrics.districtDist.slice(0, 5).map(d => (
                            <div key={d._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-sm">{d._id || 'Anonymized'}</span>
                                <span className="bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">{d.count} interactions</span>
                            </div>
                        ))}
                        {metrics.districtDist.length === 0 && <p className="text-text-muted text-sm italic">No district data available</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
