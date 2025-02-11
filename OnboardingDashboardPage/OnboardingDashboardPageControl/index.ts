import OnboardingDasboardPageControl, {
  OnboardingDashboardPageControlProps,
} from './OnboardingDashboardPageControl';
import { MerchantApplication, State as OnboardingDashboardPageControlState } from './reducer';
import useOnboardingDashboardPageControl from './useOnboardingDashboardPageControl';

export default OnboardingDasboardPageControl;
export { useOnboardingDashboardPageControl };
export type {
  OnboardingDashboardPageControlProps,
  OnboardingDashboardPageControlState,
  MerchantApplication,
};
