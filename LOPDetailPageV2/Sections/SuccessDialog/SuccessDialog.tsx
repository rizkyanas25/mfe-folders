import { useRouter } from 'next/router';

import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import Image from '@/components/Image';
import Space from '@/components/Space';
import Text from '@/components/Text';
import { useModal } from '@/providers/ModalProviders';
import { styled } from '@/utils/styles/stitches.config';

const DialogContent = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: 24,
  padding: '48px 24px 16px 24px !important',
});

export const dialogName = 'SuccessDialog';

export default function SuccessDialog() {
  const { active } = useModal();
  const { push } = useRouter();

  const handleOk = () => {
    push('/');
  };

  return (
    <Dialog open={active === dialogName} width={400} disableCloseButton disableOverlayClick>
      <DialogContent>
        <Image
          src='/assets/images/wallet-success-topup.png'
          width={120}
          height={120}
          alt='success'
        />

        <Space fullWidth size={[8, 0]} direction='vertical'>
          <Text weight={700} size={24} align='center'>
            Detail tambahan berhasil disimpan
          </Text>

          <Text size={16} color='$N400' align='center'>
            Kami telah mengirimkan LOP (Letter of Proposal) ke email PIC Anda. Silahkan ikuti
            instruksi di email untuk menandatangani LOP.
          </Text>
        </Space>

        <Button fullWidth variant='secondary' css={{ marginTop: 40 }} onClick={handleOk}>
          Konfirmasi
        </Button>
      </DialogContent>
    </Dialog>
  );
}
