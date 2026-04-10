export default function Head() {
  const title = "Личный кабинет — Ҳадаф";
  const description =
    "Личный кабинет волонтёра или сотрудника учреждения: управление нуждами, обещаниями и настройками.";
  const fallbackSiteUrl =
    process.env.NODE_ENV === "production"
      ? "https://hadaf.tj"
      : "http://localhost:3000";
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    fallbackSiteUrl
  ).replace(/\/$/, "");
  const url = `${baseUrl}/dashboard`;
  const image = `${baseUrl}/hero.webp`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ҳадаф" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
