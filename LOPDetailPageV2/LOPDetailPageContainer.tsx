import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';

import CircularProgress from '@/components/CircularProgress';
import Spinner from '@/components/Spinner';
import ConfigProvider, { ConfigProviderData } from '@/providers/ConfigProvider';
import { useModal } from '@/providers/ModalProviders';
import ModalProvider from '@/providers/ModalProviders/ModalProviders';

import useCreateLOPMutation from './gql/useCreateLOPMutation';
import LOPDetailPageControl, { useLOPDetailPageControl } from './LOPDetailPageControl';
import LOPDetailPageView from './LOPDetailPageView';
import { DetailFormValues } from './Sections/DetailForm';
import { DocumentFormValues } from './Sections/DocumentForm';
import { dialogName } from './Sections/SuccessDialog';

type LOPDetailPageContainerProps = {
  config: ConfigProviderData;
};

type LOPDetailPageViewSubmitHandler = SubmitHandler<LOPDetailPageViewValues>;
type LOPDetailPageViewValues = DetailFormValues & DocumentFormValues;

function ContentWrapper() {
  const { state } = useLOPDetailPageControl();
  const { isReady, merchantApplicationLOP } = state;
  const { open } = useModal();
  const { query } = useRouter();

  const validMerchantApplicationLOP = merchantApplicationLOP ?? undefined;

  const [createLOP, { loading: createLOPLoading }] = useCreateLOPMutation({
    onCompleted: () => {
      open(dialogName);
    },
  });

  const handleSubmit: LOPDetailPageViewSubmitHandler = ({
    aktaPendirianSKMediaID: _aktaPendirianSKMediaID,
    aktaPerubahanSKMediaID: _aktaPerubahanSKMediaID,
    suratKuasaMediaID: _suratKuasaMediaID,
    ...values
  }) => {
    if (!merchantApplicationLOP) {
      return;
    }

    createLOP({ variables: { input: { ...values, applicationID: Number(query.id) } } });
  };

  if (!isReady) {
    return <CircularProgress />;
  }

  return (
    <Spinner visible={!isReady || createLOPLoading}>
      <LOPDetailPageView
        onSubmit={handleSubmit}
        merchantApplicationLOP={validMerchantApplicationLOP}
      />
    </Spinner>
  );
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
