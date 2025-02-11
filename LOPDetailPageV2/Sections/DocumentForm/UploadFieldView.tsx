import {
  ChangeEventHandler,
  Dispatch,
  ForwardedRef,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import BaseButton from '@/components/BaseButton';
import Button from '@/components/Button';
import PlusIcon from '@/components/Icon/icons/PlusIcon';
import Image from '@/components/Image';
import Space from '@/components/Space';
import Text from '@/components/Text';
import { styled } from '@/utils/styles/stitches.config';

export type UploadFieldViewChangeHandler = ChangeEventHandler<HTMLInputElement>;
export type UploadFieldViewProps = {
  label: string;
  readOnly?: boolean;
  onChange?: UploadFieldViewChangeHandler;
};

const IconWrapper = styled('div', {
  width: 48,
  height: 48,
  borderRadius: '50%',
  border: 'solid $P300 1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Bordered = styled(Space, {
  borderStyle: 'dashed',
  borderColor: '$N200',
  borderWidth: 1,
  borderRadius: 12,
  height: 240,
  overflow: 'hidden',
});

export type UploadFieldViewInstance = {
  setDocument: Dispatch<SetStateAction<File | null>>;
};

function UploadFieldView(
  { label, readOnly, onChange }: UploadFieldViewProps,
  ref: ForwardedRef<UploadFieldViewInstance>,
) {
  const [document, setDocument] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    setDocument,
  }));

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    onChange?.(e);

    if (!file) return;

    if (file.type === 'application/pdf') {
      setDocument(file);
    } else {
      setDocument(null);
    }
  };

  return (
    <Space fullWidth direction='vertical' size={[16, 0]}>
      <Text size={14} weight={700}>
        {label}
      </Text>

      <Bordered
        size={[12, 0]}
        padding={16}
        fullWidth
        direction='vertical'
        justify='center'
        align='center'
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='.pdf'
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />

        {document && (
          <BaseButton disabled={readOnly} onClick={handleClick}>
            <Space direction='vertical' align='center' size={[16, 0]}>
              <div>
                <Image src='/assets/images/pdf.png' width={98} height={140} alt={document.name} />
              </div>
              <Text>{document.name}</Text>
            </Space>
          </BaseButton>
        )}

        {!document && (
          <>
            <IconWrapper>
              <PlusIcon size={16} color='$P300' />
            </IconWrapper>

            <Button
              disabled={readOnly}
              size='small'
              variant='secondary'
              css={{ backgroundColor: '$P300' }}
              onClick={handleClick}
            >
              Tambah Foto
            </Button>
          </>
        )}
      </Bordered>
    </Space>
  );
}

export default forwardRef(UploadFieldView);
