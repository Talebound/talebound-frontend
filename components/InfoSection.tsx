import React, { PropsWithChildren } from 'react';
import { styled } from '@nextui-org/react';
import Link from 'next/link';

const Section = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '$sm',
  alignItems: 'center',
  justifyContent: 'center',
});

const SectionContent = styled('div', {
  display: 'flex',
  fontSize: '$lg',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  border: '1px dashed $text',
  padding: '$sm',
  borderRadius: '10px',
  backgroundColor: '$transparent40',

  ['a']: {
    fontSize: '$xs',
    // alignSelf: 'flex-end',
  },
});

interface InfoSectionProps extends PropsWithChildren {
  title?: string;
  linkTitle?: string;
  linkHref?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, linkTitle, linkHref, children }) => {
  return (
    <Section>
      {title && <span>{title}</span>}
      <SectionContent>
        {children}
        <>{linkTitle && linkHref && <Link href={linkHref}>{linkTitle}</Link>}</>
      </SectionContent>
    </Section>
  );
};

export default InfoSection;