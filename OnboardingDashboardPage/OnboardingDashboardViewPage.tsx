import { styled } from '@/utils/styles/stitches.config';

import { OnboardingDashboardPageControlState } from './OnboardingDashboardPageControl';
import { MerchantApplication } from './OnboardingDashboardPageControl';
import MissionWrapperContainer from './Sections/MissionWrapper/MissionWrapperContainer';

export type OnboardingDashboardViewPageProps = {
  activeStep: OnboardingDashboardPageControlState['activeStep'];
  merchantApplication: MerchantApplication | null;
};

const Root = styled('div', {
  marginBottom: '24px',
});

export default function OnboardingDashboardViewPage({
  activeStep,
  merchantApplication,
}: OnboardingDashboardViewPageProps) {
  return (
    <Root>
      <MissionWrapperContainer merchantApplication={merchantApplication} activeStep={activeStep} />
    </Root>
  );
}
