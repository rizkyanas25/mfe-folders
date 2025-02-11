import DocumentIcon from '@/components/Icon/icons/DocumentIcon';
import ForkliftIcon from '@/components/Icon/icons/ForkliftIcon';
import HomeIcon from '@/components/Icon/icons/HomeIcon';
import PencilIcon from '@/components/Icon/icons/PencilIcon';
import PenIcon from '@/components/Icon/icons/PenIcon';
import TicketIcon from '@/components/Icon/icons/TicketIcon';

export const merchantApplicationStatus = {
  profiling: 0,
  kycVerifying: 1000,
  kycFailed: 999,
  kycSuccess: 1100,
  opsRequirementSubmitted: 1200,
  warehouseApplicationAccepted: 1300,
};

export type MissionType = {
  label: string;
  desc: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  buttonLabel: string;
  colors?: {
    iconColor: string;
    bgColor: string;
    bgBorderColor: string;
    btnColor: string;
    btnBgColor: string;
    btnBgBorderColor: string;
  };
};

export const missions = [
  {
    label: 'Profil Gudang',
    desc: 'Isi profil gudang yang anda butuhkan',
    icon: DocumentIcon,
    buttonLabel: 'Isi Sekarang',
  },
  {
    label: 'Katalog Gudang',
    desc: 'Pilih gudang yang anda inginkan',
    icon: HomeIcon,
    buttonLabel: 'Pilih Gudang',
  },
  {
    label: 'E-KYC',
    desc: 'Lakukan konfirmasi data diri anda',
    icon: PencilIcon,
    buttonLabel: 'Konfirmasi',
  },
  {
    label: 'Ops Requirement',
    desc: 'Masukkan data tambahan untuk operasional',
    icon: ForkliftIcon,
    buttonLabel: 'Konfirmasi',
  },
  {
    label: 'Perkiraan Biaya',
    desc: 'Pastikan anda menyetujui biaya gudang',
    icon: TicketIcon,
    buttonLabel: 'Konfirmasi',
  },
  {
    label: 'LOP dan LOA',
    desc: 'Tanda tangan LOP dan LOA',
    icon: PenIcon,
    buttonLabel: 'Konfirmasi',
  },
];
