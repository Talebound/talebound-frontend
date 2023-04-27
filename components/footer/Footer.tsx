import React from "react";
import Link from "next/link";
import {Image, styled, Text} from "@nextui-org/react";
import {SiDiscord, SiGithub, SiKofi, SiYoutube} from "react-icons/si";


const FooterDiv = styled('div', {
  width: '100%',
  minHeight: '150px',
  backgroundColor: '$black',
  maskImage: 'linear-gradient(200deg, rgba(255, 255, 255, 0) -200%, #ffffff 100%)',
  color: '$white',
  padding: '$md',
  display: 'flex',
  flexDirection: 'column',
});

const FooterContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',

  [`& a`]: {
    color: '$link2',
    transition: 'opacity 0.2s ease-in-out',
  },
  [`& a:hover`]: {
    opacity: '0.7',
  },

  '@lg': {
    flexDirection: 'row',
  }
});

const LogoWrapper = styled('div', {
  display: 'flex',
  padding: '$sm',
  minWidth: '390px',
  color: "red",
});

const LinkColumnWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xl',
  flexGrow: 1,
  justifyContent: 'space-evenly',

  '@xs': {
    flexDirection: 'row',
  }
});

const LinkColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$4',
  minWidth: '10rem',
});

const FooterAvatar = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '.5rem',
  padding: '$sm',
  minWidth: '390px',

  '@sm': {
    justifyContent: 'flex-end',
  },

  [`& img`]: {
    borderRadius: '50%',
    width: '$10',
    height: '$10',
  }
});

const FooterIcons = styled('div', {
  display: 'flex',
  gap: '$md',
  fontSize: '$xl',
});

const Footer: React.FC = () => {
  return (
    <FooterDiv>
      <FooterContent>
        <LogoWrapper>
          <Image width="7rem" height="7rem" src="/assets/logo/logo-v1.png" />
        </LogoWrapper>
        <LinkColumnWrapper>
          <LinkColumn>
            <Text h5 color="$primary600" transform="uppercase">Talebound</Text>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </LinkColumn>
          <LinkColumn>
            <Text h5 color="$primary600" transform="uppercase">Terms</Text>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </LinkColumn>
          <LinkColumn>
            <Text h5 color="$primary600" transform="uppercase">How to play</Text>
            <Link href="/how-to/basics">Basics</Link>
            <Link href="/how-to/world-differences">World differences</Link>
          </LinkColumn>
        </LinkColumnWrapper>
        <FooterAvatar>
          <FooterIcons>
            <Link href="https://discord.gg/wWsXB5gVmY" target="_blank"><SiDiscord /></Link>
            <Link href="https://www.youtube.com/@Talebound" target="_blank"><SiYoutube /></Link>
            <Link href="https://github.com/Talebound" target="_blank"><SiGithub /></Link>
            <Link href="https://ko-fi.com/talebound" target="_blank"><SiKofi /></Link>
          </FooterIcons>
          <Link href="https://github.com/the-medo" target="_blank"><Text color={'white'}>by Medo</Text></Link>
          <Link href="https://github.com/the-medo" target="_blank"><img src="https://avatars.githubusercontent.com/u/8963255?s=60&v=4" alt="the-medo" /></Link>
          <Text color={'white'}>| © {new Date().getFullYear()} Talebound</Text>
        </FooterAvatar>
      </FooterContent>
    </FooterDiv>
  );
}

export default Footer;