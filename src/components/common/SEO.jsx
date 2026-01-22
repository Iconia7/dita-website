import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, type = 'website', image = '/og-image.jpg' }) => {
  const siteName = "DITA - Daystar Information Technology Association";
  
  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title} | DITA</title>
      <meta name='description' content={description} />
      
      {/* Facebook / LinkedIn (Open Graph) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} /> {/* Ideally a 1200x630px image in public folder */}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;