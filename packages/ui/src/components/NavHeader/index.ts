export { NavHeader, Header } from './NavHeader';
export type {
  NavHeaderProps,
  NavHeaderItem,
  NavHeaderBranding,
  OfferBannerConfig,
  NavSearchConfig,
  PopularSearchTag,
  NavActionItem,
} from './NavHeader.types';

export { useNavHeaderContext } from './NavHeader.context';
export {
  offerBannerVariants,
  navHeaderVariants,
  navHeaderContainerVariants,
  navHeaderItemVariants,
  navActionVariants,
  megaMenuCardVariants,
  searchPopoverCardVariants,
} from './NavHeader.styles';

export { OfferBanner } from './subcomponents/OfferBanner';
export { NavBrand } from './subcomponents/NavBrand';
export { NavItems } from './subcomponents/NavItems';
export { NavMegaMenu } from './subcomponents/NavMegaMenu';
export { NavSearch } from './subcomponents/NavSearch';
export { NavActions } from './subcomponents/NavActions';
