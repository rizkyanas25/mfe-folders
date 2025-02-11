import { Col, Row } from '@/components/Grid';

import UploadField from './UploadFieldContainer';

type DocumentFormProps = {
  readOnly?: boolean;
};

export default function DocumentForm({ readOnly }: DocumentFormProps) {
  return (
    <Row gutter={[24, 0]}>
      <Col span={8}>
        <UploadField
          readOnly={readOnly}
          type='Akta_Pendirian_SK'
          label='Akta Pendirian dan SK Kemenkumham'
        />
      </Col>

      <Col span={8}>
        <UploadField readOnly={readOnly} type='Akta_Perubahan_SK' label='Akta Perubahan Terakhir' />
      </Col>

      <Col span={8}>
        <UploadField readOnly={readOnly} type='Surat_Kuasa' label='Surat Kuasa' />
      </Col>
    </Row>
  );
}
