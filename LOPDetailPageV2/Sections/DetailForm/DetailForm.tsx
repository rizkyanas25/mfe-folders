import { Controller, useFormContext } from 'react-hook-form';

import { Col, Row } from '@/components/Grid';
import QuestionCircleIcon from '@/components/Icon/icons/QuestionCircleIcon';
import NumericTextField from '@/components/NumericTextField';
import Select from '@/components/Select';
import Space from '@/components/Space';
import Text from '@/components/Text';
import Textarea from '@/components/Textarea';
import TextField from '@/components/TextField';
import Tooltip from '@/components/Tooltip';
import patternRegExr from '@/constants/patternRegExr';

export type DetailFormValues = {
  companyName: string;
  picName: string;
  picPhone: string;
  picEmail: string;
  picPosition: string;
  financeEmail: string;
  businessEntity: string;
  nib: string;
  companyAddress: string;
};

export type DetailFormProps = {
  readonly?: boolean;
};

const emailRegex = patternRegExr.EMAIL;

export default function DetailForm({ readonly }: DetailFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<DetailFormValues>();

  return (
    <Row gutter={[24, 0]}>
      <Col span={12}>
        <TextField
          {...register('companyName', { required: 'Nama perusahaan harus diisi' })}
          readOnly={readonly}
          fullWidth
          label='Nama Perusahaan'
          placeholder='Masukkan nama lengkap perusahaan'
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
        />
      </Col>

      <Col span={12}>
        <TextField
          {...register('picName', { required: 'Nama lengkap PIC harus diisi' })}
          readOnly={readonly}
          fullWidth
          label='Nama Lengkap PIC'
          placeholder='Masukkan nama lengkap PIC'
          error={!!errors.picName}
          helperText={errors.picName?.message}
        />
      </Col>

      <Col span={12}>
        <NumericTextField
          {...register('picPhone', {
            required: 'Nomor Telepon PIC harus diisi',
            pattern: {
              value: patternRegExr.INDONESIAN_PHONE_WITHOUT_COUNTRY_CODE,
              message: 'Nomor telepon PIC tidak valid',
            },
          })}
          readOnly={readonly}
          fullWidth
          label='Nomor Telepon PIC'
          placeholder='Masukkan nomor telepon PIC'
          prefix={<b>+62</b>}
          error={!!errors.picPhone}
          helperText={errors.picPhone?.message}
        />
      </Col>

      <Col span={12}>
        <TextField
          {...register('picEmail', {
            required: 'Email PIC harus diisi',
            pattern: {
              value: emailRegex,
              message: 'Email PIC tidak valid',
            },
          })}
          readOnly={readonly}
          fullWidth
          type='email'
          label='Email PIC'
          placeholder='Masukkan email PIC'
          error={!!errors.picEmail}
          helperText={errors.picEmail?.message}
        />
      </Col>

      <Col span={12}>
        <TextField
          {...register('picPosition', { required: 'Jabatan PIC harus diisi' })}
          readOnly={readonly}
          fullWidth
          label='Jabatan PIC'
          placeholder='Pilih jabatan PIC'
          error={!!errors.picPosition}
          helperText={errors.picPosition?.message}
        />
      </Col>

      <Col span={12}>
        <TextField
          {...register('financeEmail', {
            required: 'Invoicing Email harus diisi',
            pattern: {
              value: emailRegex,
              message: 'Invoicing email tidak valid',
            },
          })}
          readOnly={readonly}
          fullWidth
          label={
            <Space size={[0, 4]} align='center'>
              Invoicing Email
              <Tooltip
                placement='top'
                maxWidth={240}
                title={
                  <Text size={12} color='$N000' align='center'>
                    Email ini digunakan untuk mengirimkan invoice setiap bulannya
                  </Text>
                }
              >
                <QuestionCircleIcon color='$P300' />
              </Tooltip>
            </Space>
          }
          placeholder='Masukkan email untuk invoice'
          error={!!errors.financeEmail}
          helperText={errors.financeEmail?.message}
        />
      </Col>

      <Col span={12}>
        <Controller
          control={control}
          name='businessEntity'
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              readOnly={readonly}
              label='Jenis Bisnis'
              placeholder='Pilih jenis bisnis perusahaan Anda'
              TextFieldProps={{
                error: !!errors.businessEntity,
                helperText: errors.businessEntity?.message,
              }}
            >
              <Select.Option value='COMPANY'>Perseroan Terbatas/ CV/ Badan Usaha</Select.Option>
              <Select.Option value='INDIVIDUAL'>Individual/ Perorangan</Select.Option>
            </Select>
          )}
        />
      </Col>

      <Col span={12}>
        <NumericTextField
          {...register('nib', { required: 'Nomor induk berusaha harus diisi' })}
          readOnly={readonly}
          fullWidth
          label='Nomor Induk Berusaha (NIB)'
          placeholder='Masukkan NIB Anda'
          error={!!errors.nib}
          helperText={errors.nib?.message}
        />
      </Col>

      <Col span={24}>
        <Textarea
          {...register('companyAddress', { required: 'Alamat perusahaan harus diisi' })}
          readOnly={readonly}
          fullWidth
          label='Alamat Perusahaan'
          placeholder='Masukkan alamat lengkap perusahaan Anda'
          error={!!errors.companyAddress}
          helperText={errors.companyAddress?.message}
        />
      </Col>
    </Row>
  );
}
