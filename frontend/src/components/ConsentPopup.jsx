import React from 'react';
import { ShieldAlert } from 'lucide-react';

const ConsentPopup = ({ onAccept }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
            <div className="card max-w-md w-full text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <ShieldAlert size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Privacy & Consent</h3>
                <p className="text-text-muted text-sm mb-6">
                    Geneqi collects anonymized metrics (gender, district, click events) to improve our services for youth.
                    We <strong>never</strong> store your Aadhaar or sensitive personal data.
                </p>
                <div className="flex flex-col gap-2">
                    <button onClick={onAccept} className="btn btn-primary justify-center">
                        I Agree & Continue
                    </button>
                    <button onClick={() => window.location.href = 'https://google.com'} className="text-sm text-text-muted hover:underline mt-2">
                        I do not agree (Exit)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentPopup;
