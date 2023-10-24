import React, { useCallback, useState } from 'react';
import { Row } from '../../components/Flex/Flex';
import { TitleH2 } from '../../components/Typography/Title';
import { Button } from '../../components/Button/Button';
import { TbPlus } from 'react-icons/tb';
import LocationForm from './LocationForm';
import ContentSection from '../../components/ContentSection/ContentSection';
import { usePlacement } from '../../hooks/usePlacement';

interface LocationNewProps {
  canEdit?: boolean;
}

const LocationNew: React.FC<LocationNewProps> = ({ canEdit }) => {
  const [placement, validPlacement] = usePlacement('location');
  const [createMode, setCreateMode] = useState(false);

  const toggleCreateMode = useCallback(() => setCreateMode((p) => !p), []);

  return (
    <ContentSection>
      <Row gap="md" fullWidth justifyContent="between">
        <TitleH2>New location</TitleH2>
        {canEdit && (
          <Row gap="md">
            <Button
              color={createMode ? 'primaryFill' : 'primaryOutline'}
              onClick={toggleCreateMode}
            >
              <TbPlus />
              Create location
            </Button>
          </Row>
        )}
      </Row>
      {createMode && validPlacement && <LocationForm placement={placement} />}
    </ContentSection>
  );
};

export default LocationNew;
