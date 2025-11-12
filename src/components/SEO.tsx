import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

export const SEO = ({
  title = 'Course Registration System',
  description = 'Modern course registration system with prerequisite validation. View available courses, check prerequisites, and register for next semester.',
  keywords = 'course registration, university, prerequisites, academic schedule, student portal',
  ogImage = '/og-image.png',
  url = 'https://courses-projext.vercel.app/'
}: SEOProps) => {
  const fullTitle = title.includes('Course Registration System') 
    ? title 
    : `${title} | Course Registration System`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
