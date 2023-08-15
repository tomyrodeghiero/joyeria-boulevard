// components/OSMMap.tsx

const GoogleMaps: React.FC = () => {
  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.4100314466664!2d-64.3539578240228!3d-33.12459088089878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d201f4e0aa9535%3A0xca3168adbc8cb88f!2sBoulevard!5e0!3m2!1ses-419!2sar!4v1692064413469!5m2!1ses-419!2sar"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMaps;
