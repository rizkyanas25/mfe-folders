import { useRef, useState } from 'react';

import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import Spinner from '@/components/Spinner';
import { useConfig } from '@/providers/ConfigProvider';
import { getAuthDataCookies } from '@/utils/cookies/authCookie/authCookie';
import { makeMediaID, uploadFile } from '@/utils/media';

import UploadFieldView, {
  UploadFieldViewChangeHandler,
  UploadFieldViewInstance,
  UploadFieldViewProps,
} from './UploadFieldView';

export type DocumentFormValues = {
  aktaPendirianSKMediaID: string | null;
  aktaPerubahanSKMediaID: string | null;
  suratKuasaMediaID: string | null;
};

export type UploadFieldContainerType = 'Akta_Pendirian_SK' | 'Akta_Perubahan_SK' | 'Surat_Kuasa';
export type UploadFieldContainer = Pick<UploadFieldViewProps, 'label' | 'readOnly'> & {
  type: UploadFieldContainerType;
};

const mapName: Record<UploadFieldContainerType, keyof DocumentFormValues> = {
  Akta_Pendirian_SK: 'aktaPendirianSKMediaID',
  Akta_Perubahan_SK: 'aktaPerubahanSKMediaID',
  Surat_Kuasa: 'suratKuasaMediaID',
};

export default function UploadFieldContainer({ type, ...props }: UploadFieldContainer) {
  const { setValue } = useFormContext<DocumentFormValues>();
  const [loading, setLoading] = useState(false);
  const fieldRef = useRef<UploadFieldViewInstance>(null);
  const { env, mediaSvcUrl, mediaUploadPath } = useConfig();
  const url = `${mediaSvcUrl}${mediaUploadPath}`;

  const setFormValue = (value: string | null) => {
    if (!mapName[type]) {
      return;
    }

    setValue(mapName[type], value);
  };

  const handleChange: UploadFieldViewChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFormValue(null);
      return;
    }

    const { accessToken } = getAuthDataCookies(null, env);

    setLoading(true);

    try {
      const response = await uploadFile({ url }, { file, accessToken });
      const data = response.data.media[0];
      setFormValue(makeMediaID(data.media_key, data.uuid));
    } catch (e) {
      fieldRef.current?.setDocument(null);
      toast.error(`Error on upload document ${type.replaceAll('_', ' ')}`, {
        position: 'top-center',
      });
    }

    setLoading(false);
  };

  return (
    <Spinner visible={loading}>
      <UploadFieldView {...props} ref={fieldRef} onChange={handleChange} />
    </Spinner>
  );
}
