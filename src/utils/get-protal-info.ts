export const getPortalInfo = () => {
  const host = window.location.host;
  const subdomain = host.split(".")[0];
  const portalUrl = `${subdomain}.saciahub.com`;

  return { subdomain, portalUrl };
};
