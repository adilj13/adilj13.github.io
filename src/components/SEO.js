import { Helmet } from 'react-helmet';

const SITE_URL = 'https://adilj13.github.io';
const DEFAULT_TITLE = 'Adil Aziz — Techno-Industrialist';
const DEFAULT_DESCRIPTION = 'Adil Aziz — Techno-Industrialist, Director at Sufi Engineering. Full-time mechanical engineering management, part-time software engineering consultant. CNC, CAD, SolidWorks, and web development.';
const DEFAULT_IMAGE = 'https://avatars.githubusercontent.com/u/adilj13';
const SITE_NAME = 'Adil Aziz';

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  article = null,
}) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@adilj13" />
      <meta name="twitter:site" content="@adilj13" />

      {/* Article specific */}
      {article && article.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article && article.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article && article.author && (
        <meta property="article:author" content={article.author} />
      )}
    </Helmet>
  );
};

export default SEO;
