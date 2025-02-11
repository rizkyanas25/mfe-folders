import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Paper from '@/components/Paper';
import Space from '@/components/Space';
import Spinner from '@/components/Spinner';
import Text from '@/components/Text';
import { useModal } from '@/providers/ModalProviders';

import useCreateLOPMutation from './gql/useCreateLOPMutation';
import { MerchantApplicationLOP } from './LOPDetailPageControl';
import DetailForm, { DetailFormValues } from './Sections/DetailForm';
import DocumentForm, { DocumentFormValues } from './Sections/DocumentForm';
import { dialogName } from './Sections/SuccessDialog';
import SuccessDialog from './Sections/SuccessDialog';

export type LOPDetailPageViewValues = DetailFormValues & DocumentFormValues;
export type LOPDetailPageViewSubmitHandler = SubmitHandler<LOPDetailPageViewValues>;
export type LOPDetailPageViewProps = {
  readonly?: boolean;
  onSubmit?: LOPDetailPageViewSubmitHandler;
  merchantApplicationLOP?: MerchantApplicationLOP;
};

const elevation = 3;

const hideDocumentSection = true;

function UploadDocumentSection(props: { readonly: boolean }) {
  const { readonly } = props;
  return (
    <Paper elevation={elevation}>
      <Space fullWidth padding={24} size={[24, 0]} direction='vertical'>
        <Space fullWidth direction='vertical'>
          <Space size={[0, 4]} align='end'>
            <Text size={16} weight={700} lineHeight='24px'>
              Dokumen Legal
            </Text>
            <Text>(optional)</Text>
          </Space>

          <Text size={14} weight={400}>
            Unggah dokumen legal Anda dengan resolusi minimal 1600 x 1600 px dan maksimal 5.000 x
            5.000 px, dengan format .png atau .jpg.
          </Text>
        </Space>

        <DocumentForm readOnly={readonly} />
      </Space>
    </Paper>
  );
}

export default function LOPDetailPageView({
  readonly = false,
  merchantApplicationLOP,
}: LOPDetailPageViewProps) {
  const { query } = useRouter();
  const { open } = useModal();
  const form = useForm<LOPDetailPageViewValues>({ defaultValues: merchantApplicationLOP });
  const { handleSubmit } = form;

  const [createLOP, { loading: createLOPLoading }] = useCreateLOPMutation({
    onCompleted: () => {
      open(dialogName);
    },
  });

  const onSubmit: LOPDetailPageViewSubmitHandler = ({
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

  return (
    <Spinner visible={createLOPLoading}>
      <>
        <FormProvider {...form}>
          <Space
            fullWidth
            direction='vertical'
            size={[24, 0]}
            css={{ position: 'relative', paddingBottom: 0 }}
          >
            <Paper elevation={elevation}>
              <Space padding={24} size={[8, 0]} direction='vertical'>
                <Text size={12}>
                  <Link href={`/warehouse/applications`} passHref>
                    <Text as='a' size='inherit' color='$P300'>
                      Integrasi
                    </Text>
                  </Link>
                  &nbsp;&nbsp;/&nbsp;&nbsp;Konfirmasi LOP
                </Text>
                <Text as='h5' size={24} lineHeight='30px' color='$N600' weight={700}>
                  Konfirmasi LOP (Letter of Proposal)
                </Text>
              </Space>

              <Divider />

              <Space fullWidth size={[24, 0]} padding={24} direction='vertical'>
                <Space fullWidth direction='vertical'>
                  <Text size={16} weight={700} lineHeight='24px'>
                    Detail Tambahan
                  </Text>

                  <Text size={14} weight={400}>
                    Harap diisi dengan data PIC (Person in Charge) yang akan menandatangani dokumen
                    legal
                  </Text>
                </Space>

                <DetailForm readonly={readonly} />
              </Space>
            </Paper>

            {!hideDocumentSection && <UploadDocumentSection readonly={readonly || false} />}

            {!readonly && (
              <Space
                fullWidth
                justify='end'
                size={[0, 16]}
                css={{
                  position: 'sticky',
                  bottom: 0,
                  padding: '16px 24px',
                  boxShadow: '0px -4px 20px 0px #0000000D',
                  background: '$N000',
                }}
              >
                <Button variant='tertiary'>Batalkan</Button>

                <Button variant='secondary' onClick={handleSubmit(onSubmit)}>
                  Simpan
                </Button>
              </Space>
            )}
          </Space>
        </FormProvider>

        <SuccessDialog />
      </>
    </Spinner>
  );
}
