import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import {FC, useEffect} from 'react';

import { Link } from '@/components/Link/Link.tsx';

import {useViewport, initUtils} from "@tma.js/sdk-react";

import tonSvg from './ton.svg';

import './IndexPage.css';

export const IndexPage: FC = () => {
    const vp = useViewport();
    useEffect(() => {
        if (vp && !vp.isExpanded) {
            vp.expand()
        }
    }, [vp]);

    const utils = initUtils();

    const share = () => {
        utils.openTelegramLink(
            'https://t.me/share/url?url=https://t.me/MiniAppLocalTestBot/app'
        );
    }
    const goToChannel = () => {
        utils.openTelegramLink(
            'https://t.me/MiniAppLocalTestBot'
        );
    }

    const goToExternal = () => {
        utils.openLink(
            'https://google.com'
        );
    }

  return (
    <List>
      <Section
        header='Features'
        footer='You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects'
      >
        <Link to='/ton-connect'>
          <Cell
            before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
            subtitle='Connect your TON wallet'
          >
            TON Connect
          </Cell>
        </Link>
      </Section>
      <Section
        header='Application Launch Data'
        footer='These pages help developer to learn more about current launch information'
      >
        <Link to='/init-data'>
          <Cell subtitle='User data, chat information, technical data'>Init Data</Cell>
        </Link>
        <Link to='/launch-params'>
          <Cell subtitle='Platform identifier, Mini Apps version, etc.'>Launch Parameters</Cell>
        </Link>
        <Link to='/theme-params'>
          <Cell subtitle='Telegram application palette information'>Theme Parameters</Cell>
        </Link>
      </Section>
        <Section>
            <Cell onClick={share}>Share this mini app to a group</Cell>
            <Cell onClick={goToChannel}>Open Channel</Cell>
            <Cell onClick={goToExternal}>Open external url</Cell>
        </Section>
    </List>
  );
};
