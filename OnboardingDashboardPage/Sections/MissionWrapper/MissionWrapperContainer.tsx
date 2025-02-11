import { useRouter } from 'next/router';

import MissionWrapper from './MissionWrapper';
import { MissionType } from '../../constants';
import { OnboardingDashboardViewPageProps } from '../../OnboardingDashboardViewPage';

export default function MissionWrapperContainer({
  activeStep,
  merchantApplication,
}: OnboardingDashboardViewPageProps) {
  const router = useRouter();

  const handleClick = (mission: MissionType) => {
    if (mission.label !== 'LOP dan LOA') {
      router.push('/integration/onboard/fulfillment');
    } else {
      router.push(`/integration/warehouseApplication/${merchantApplication?.id}/lop`);
    }
  };

  return (
    <MissionWrapper
      merchantApplication={merchantApplication}
      activeStep={activeStep}
      handleClick={handleClick}
    />
  );
}
