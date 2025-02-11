import { useState, useEffect } from 'react';

import Button from '@/components/Button';
import CheckIcon from '@/components/Icon/icons/CheckIcon';
import ChevronIcon from '@/components/Icon/icons/ChevronIcon';
import Space from '@/components/Space';
import Text from '@/components/Text';
import { styled } from '@/utils/styles/stitches.config';

import { merchantApplicationStatus } from '../../constants';
import { MissionType, missions } from '../../constants';
import { OnboardingDashboardViewPageProps } from '../../OnboardingDashboardViewPage';

const ContentWrapper = styled(Space, {
  backgroundColor: '$N000',
  borderRadius: '12px',
  width: '100%',
  marginTop: 20,
  position: 'relative',
  boxShadow: '0px 4px 25px 0px $N700',
});

const RotateableChevron = styled(ChevronIcon, {
  position: 'absolute',
  top: 24,
  right: 24,
  cursor: 'pointer',
});

const ScrollableSpace = styled(Space, {
  display: 'flex',
  width: '100%',
  overflowX: 'auto', // Enable horizontal scrolling
  flexWrap: 'nowrap', // Prevent wrapping
  '& > *:not(:last-child)': {
    // Apply margin-right to all children except the last one
    marginRight: '20px',
  },
  '&::-webkit-scrollbar': {
    height: '0px', // Hides the scrollbar thumb
  },
  scrollbarWidth: 'none', // For Firefox: hide scrollbar
  '-ms-overflow-style': 'none', // For IE: hide scrollbar
});

const MissionPaper = styled('div', {
  flex: '0 0 300px', // Prevent shrinking and set a fixed width
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: 16,
  position: 'relative',
  border: '1px solid var(--stroke-primary-n-200, $N200)',
  borderRadius: 12,
});

const StepMarker = styled('div', {
  borderRadius: '100%',
  height: 32,
  width: 32,
  border: '1px solid var(--stroke-primary-n-200, $N200)',
  backgroundColor: 'N000',
  position: 'absolute',
  top: 16,
  right: 16,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ProgressBarContainer = styled('div', {
  height: 8,
  width: '100%',
  backgroundColor: 'var(--stroke-primary-n-200, $N200)',
  borderRadius: 8,
  position: 'relative',
  margin: '4px 0px 6px 0px',
});

const ProgressBarFiller = styled('div', {
  height: '100%',
  backgroundColor: '$G300',
  borderRadius: 'inherit',
});

type MissionWrapperProps = OnboardingDashboardViewPageProps & {
  handleClick: (mission: MissionType) => void;
};
type MissionStep = 1 | 2 | 3 | 4 | 5 | 6;

export default function MissionWrapper({
  activeStep,
  handleClick,
  merchantApplication,
}: MissionWrapperProps) {
  const [collapse, setCollapse] = useState(false);
  const progress = ((activeStep - 1) / missions.length) * 100;
  const [missionsWithColors, setMissionsWithColors] = useState<MissionType[]>([]);

  const getButtonStyles = (id: number, activeStep: MissionStep, mission: MissionType) => {
    const baseStyles = {
      padding: '6px 12px',
      borderRadius: '8px !important',
    };

    if (id + 1 > activeStep) {
      return {
        ...baseStyles,
        color: `${mission.colors?.btnColor} !important`,
        backgroundColor: `${mission.colors?.btnBgColor} !important`,
        border: `1px solid ${mission.colors?.btnBgBorderColor}`,
        '&:hover': {
          opacity: 0.7,
        },
      };
    }

    return baseStyles;
  };

  const getButtonLabel = (mission: MissionType) => {
    if (mission.label === 'E-KYC') {
      if (
        merchantApplication?.status === merchantApplicationStatus.kycVerifying ||
        (merchantApplication?.status === merchantApplicationStatus.kycSuccess &&
          !merchantApplication?.dealID)
      ) {
        return 'Menunggu Verifikasi';
      }

      if (
        merchantApplication?.status === merchantApplicationStatus.kycFailed ||
        (merchantApplication?.status === merchantApplicationStatus.kycSuccess &&
          merchantApplication?.dealID)
      ) {
        return 'Verifikasi Selesai';
      }

      return mission.buttonLabel;
    }

    return mission.label !== 'E-KYC' ? mission.buttonLabel : null;
  };

  useEffect(() => {
    const colorChooser = (id: MissionStep) => {
      let iconColor = '$N600';
      let bgColor = '$N000';
      let bgBorderColor = '$N200';
      let btnColor = '$N300';
      let btnBgColor = '$N000';
      let btnBgBorderColor = '$N200';

      if (id == activeStep) {
        iconColor = '$S300';
        bgColor = '$S100';
        bgBorderColor = '$S300';
        btnColor = '$N000';
        btnBgColor = '$S300';
        btnBgBorderColor = '$S300';
      }

      if (id < activeStep) {
        iconColor = '$G300';
        bgColor = '$G100';
        bgBorderColor = '$G300';
      }

      return { iconColor, bgColor, bgBorderColor, btnColor, btnBgColor, btnBgBorderColor };
    };
    const result = missions.map((mission: MissionType, index) => {
      const missionStep: MissionStep = (index + 1) as MissionStep;
      const colors = colorChooser(missionStep);
      return {
        ...mission,
        colors,
      };
    });
    setMissionsWithColors(result);
  }, [activeStep]);

  return (
    <ContentWrapper fullWidth padding={24} direction='vertical' size={10}>
      <Space
        direction='vertical'
        css={{
          transition: 'max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0.5ms',
          maxHeight: collapse ? 34 : '999px',
          overflow: 'hidden',
        }}
      >
        <Text size={24} weight={700} lineHeight='30px'>
          Misi Gudang Shipper
        </Text>
        <Text size={14} weight={400} lineHeight='20px'>
          Lakukan 6 langkah berikut untuk mulai menggunakan Gudang Shipper360.
        </Text>
      </Space>
      <RotateableChevron
        onClick={() => setCollapse(!collapse)}
        size={24}
        color='$N400'
        rotate={collapse ? -90 : 90}
      />
      <Space direction='horizontal' size={20}>
        <ProgressBarContainer>
          <ProgressBarFiller style={{ width: `${progress}%` }} />
        </ProgressBarContainer>
        <Text size={14} weight={400} style={{ whiteSpace: 'nowrap' }}>
          {activeStep - 1} dari 6 selesai
        </Text>
      </Space>
      <ScrollableSpace
        css={{
          transition: 'max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) 0.5ms',
          maxHeight: collapse ? 0 : '999px',
          overflowY: 'hidden',
        }}
      >
        {missionsWithColors.map((mission: MissionType, id: number) => {
          const isDisabled = id + 1 !== activeStep;
          const buttonStyles = getButtonStyles(id, activeStep, mission);
          const buttonLabel = getButtonLabel(mission);
          return (
            <MissionPaper
              key={id}
              css={{
                backgroundColor: mission.colors?.bgColor,
                border: `1px solid ${mission.colors?.bgBorderColor}`,
              }}
            >
              <mission.icon color={mission.colors?.iconColor} size={24} />
              {id + 1 < activeStep ? (
                <StepMarker css={{ backgroundColor: '$G300' }}>
                  <CheckIcon color={'$N000'} size={14} />
                </StepMarker>
              ) : (
                <StepMarker css={{ backgroundColor: '$N000' }}>
                  <Text size={14} weight={700}>
                    {id + 1}
                  </Text>
                </StepMarker>
              )}
              <Text size={14} weight={700} css={{ marginTop: 8 }}>
                {mission.label}
              </Text>
              <Text size={14} weight={400}>
                {mission.desc}
              </Text>
              <Button
                type='button'
                width='fit-content'
                size='small'
                disabled={isDisabled}
                onClick={() => handleClick(mission)}
                css={buttonStyles}
              >
                {buttonLabel}
              </Button>
            </MissionPaper>
          );
        })}
      </ScrollableSpace>
    </ContentWrapper>
  );
}
