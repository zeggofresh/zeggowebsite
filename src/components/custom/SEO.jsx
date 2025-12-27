import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, image, structuredData }) => {
  const defaultTitle = "Zeggo - Online Grocery Shopping | Fresh Fruits & Vegetables, Beauty, Pet Care & More";
  const defaultDescription = "Shop online for groceries, fresh fruits & vegetables, beauty products, pet care, electronics, mobiles & more. Fast delivery, best prices & great offers at Zeggo.";
  const defaultImage = "/z-icon.svg";
  const defaultKeywords = "online grocery shopping, fresh fruits, vegetables, beauty products, pet care, electronics, mobiles, fashion, home, cafe, toys";

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title || defaultTitle}</title>
      <meta name="title" content={title || defaultTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={canonical || window.location.href} />
      
      {/* Twitter Card Tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || defaultImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;