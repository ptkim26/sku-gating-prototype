/**
 * Social Proof
 *
 * "Enabled by X% of WorkspaceApp customers on Rippling"
 */

import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';

interface SocialProofProps {
  adoptionPercent: number;
  appName?: string;
}

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const SocialProof: React.FC<SocialProofProps> = ({ adoptionPercent, appName = 'WorkspaceApp' }) => (
  <Container>
    <Icon type={(Icon.TYPES as any).PEOPLE_TEAM_OUTLINE} size={14} />
    Enabled by {adoptionPercent}% of {appName} customers on Rippling
  </Container>
);

export default SocialProof;
