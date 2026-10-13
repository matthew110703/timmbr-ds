export { NavHeader, Header } from './NavHeader';
export type {
  NavHeaderProps,
  NavHeaderItem,
  NavHeaderBranding,
  OfferBannerConfig,
  NavSearchConfig,
  PopularSearchTag,
  NavSearchResult,
  NavSearchResults,
  NavActionItem,
  NavActionMenuItem,
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
  searchPanelOptionVariants,
} from './NavHeader.styles';

export { OfferBanner } from './subcomponents/OfferBanner';
export { NavBrand } from './subcomponents/NavBrand';
export { NavItems } from './subcomponents/NavItems';
export { NavMegaMenu } from './subcomponents/NavMegaMenu';
export { NavSearch } from './subcomponents/NavSearch';
export { NavSearchPanel, useNavSearchCombobox } from './subcomponents/NavSearchPanel';
export { NavActions } from './subcomponents/NavActions';
