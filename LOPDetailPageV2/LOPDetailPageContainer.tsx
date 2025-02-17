import CircularProgress from '@/components/CircularProgress';
import ConfigProvider, { ConfigProviderData } from '@/providers/ConfigProvider';
import ModalProvider from '@/providers/ModalProviders/ModalProviders';

import { useLOPDetailPageControl } from './LOPDetailPageControl';
import LOPDetailPageControl from './LOPDetailPageControl';
import LOPDetailPageView from './LOPDetailPageView';

type LOPDetailPageContainerProps = {
  config: ConfigProviderData;
};

function ContentWrapper() {
  const { state } = useLOPDetailPageControl();
  const { isReady, merchantApplicationLOP } = state;

  const validMerchantApplicationLOP = merchantApplicationLOP ?? undefined;

  if (!isReady) {
    return <CircularProgress />;
  }

  // return <p>TEST NJING</p>;

  return <LOPDetailPageView merchantApplicationLOP={validMerchantApplicationLOP} />;
}

export default function LOPDetailPageContainer({ config }: LOPDetailPageContainerProps) {
  return (
    <ConfigProvider data={config}>
      <LOPDetailPageControl>
        <ModalProvider>
          <ContentWrapper />
        </ModalProvider>
      </LOPDetailPageControl>
    </ConfigProvider>
  );
}
