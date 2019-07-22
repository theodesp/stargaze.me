const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const device = {
  mobileS: `only screen and (max-width: ${size.mobileS})`,
  mobileM: `only screen and (max-width: ${size.mobileM})`,
  mobileL: `only screen and (max-width: ${size.mobileL})`,
  tablet: `only screen and (max-width: ${size.tablet})`,
  laptop: `only screen and (max-width: ${size.laptop})`,
  laptopL: `only screen and (max-width: ${size.laptopL})`,
  desktop: `only screen and (max-width: ${size.desktop})`,
  desktopL: `only screen and (max-width: ${size.desktop})`,
};
