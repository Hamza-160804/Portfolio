import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react'; // Using Lucide icons for a modern look

const ResumeDownload = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    // Fallback to direct PDF download if no backend is available
    const directDownload = () => {
      window.open(`${process.env.PUBLIC_URL}/My-Resume.pdf`, '_blank');
      setLoading(false);
    };

    // Attempt to fetch from backend if available
    fetch('http://localhost:5000/download-resume')
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Failed to fetch resume');
      })
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Hamza-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error downloading resume:', error);
        
        // Fallback to direct download
        directDownload();
      });
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className='mt-6 font-syne inline-block'
      aria-label="Download Resume"
    >
      <span 
        className={`
          inline-flex items-center justify-center 
          mx-[10px] px-9 py-3 
          ${loading ? 'bg-purple-700' : 'bg-[#320F85]'} 
          text-lg font-medium rounded-lg 
          hover:bg-purple-600 
          transition duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={20} />
            Downloading...
          </>
        ) : (
          <>
            <Download className="mr-2" size={20} />
            Download CV
          </>
        )}
      </span>
    </button>
  );
};

export default ResumeDownload;