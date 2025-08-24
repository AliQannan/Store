const GSTLogo = ({ size = 100, className = '' }) => {
  return (
    <img 
      src="/gst-logo.svg" 
      alt="GST Logo with geometric T design" 
      className={className}
      style={{ width: size, height: size }}
    />
  );
};

export default GSTLogo;

