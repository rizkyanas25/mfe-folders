import CircularProgress from '@/components/CircularProgress';
import ConfigProvider, { ConfigProviderData } from '@/providers/ConfigProvider';
import ModalProvider from '@/providers/ModalProviders/ModalProviders';

import { useOnboardingDashboardPageControl } from './OnboardingDashboardPageControl';
import OnboardingDasboardPageControl from './OnboardingDashboardPageControl';
import OnboardingDashboardViewPage from './OnboardingDashboardViewPage';

type OnboardingDashboardPageContainerProps = {
  config: ConfigProviderData;
};

function ContentWrapper() {
  const { state } = useOnboardingDashboardPageControl();
  const { activeStep, isReady, merchantApplication } = state;

  if (!isReady) {
    return <CircularProgress />;
  }

  return (
    <OnboardingDashboardViewPage
      activeStep={activeStep}
      merchantApplication={merchantApplication}
    />
  );
}

export default function OnboardingDashboardContainer({
  config,
}: OnboardingDashboardPageContainerProps) {
  return (
    <ConfigProvider data={config}>
      <OnboardingDasboardPageControl>
        <ModalProvider>
          <ContentWrapper />
        </ModalProvider>
      </OnboardingDasboardPageControl>
    </ConfigProvider>
  );
}
