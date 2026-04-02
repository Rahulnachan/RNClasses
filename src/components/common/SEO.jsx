import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "RN Classes - Learn Today, Lead Tomorrow",
  description = "Join thousands of learners gaining real-world skills through expert-led courses and structured learning paths.",
  keywords = "online courses, e-learning, programming, web development, data science",
  image = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  url = window.location.href,
  type = "website",
  publishedTime,
  author = "RN Classes"
}) => {

  const siteUrl = "https://rnclasses.com"; // Change to your real domain

  return (
    <Helmet>

      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="RN Classes" />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@rnclasses" />

      {/* Article Tags */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {author && (
        <meta property="article:author" content={author} />
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "RN Classes",
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          sameAs: [
            "https://facebook.com/rnclasses",
            "https://twitter.com/rnclasses",
            "https://linkedin.com/company/rnclasses"
          ],
          description: description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mumbai",
            addressRegion: "MH",
            addressCountry: "India"
          }
        })}
      </script>

    </Helmet>
  );
};

export default SEO;
