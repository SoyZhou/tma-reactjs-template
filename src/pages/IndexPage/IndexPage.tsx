import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { FC, useEffect, useState } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import { useViewport, initUtils } from "@tma.js/sdk-react";

import tonSvg from './ton.svg';
import starsSvg from './stars.svg'; // 假设您有一个 Stars 图标

import './IndexPage.css';

export const IndexPage: FC = () => {
    const vp = useViewport();
    const [tg, setTg] = useState(null);

    useEffect(() => {
        if (vp && !vp.isExpanded) {
            vp.expand();
        }
        setTg(window.Telegram.WebApp);
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

    const initiateStarsPurchase = (productName: string, price: number) => {
        if (!tg) return;

        const invoiceParams = {
            title: productName,
            description: `Purchase ${productName} using Stars`,
            payload: JSON.stringify({productId: 'unique_id'}),
            provider_token: 'YOUR_PROVIDER_TOKEN', // 替换为您的 provider token
            currency: 'STARS',
            prices: [{label: productName, amount: price * 100}],
        };

        tg.showPopup({
            title: 'Confirm Purchase',
            message: `Are you sure you want to buy ${productName} for ${price} Stars?`,
            buttons: [
                {id: 'cancel', type: 'cancel', text: 'Cancel'},
                {id: 'buy', type: 'ok', text: 'Buy'}
            ]
        }, (buttonId) => {
            if (buttonId === 'buy') {
                tg.openInvoice(invoiceParams, (status) => {
                    if (status === 'paid') {
                        tg.showPopup({
                            title: 'Purchase Successful',
                            message: 'Thank you for your purchase!',
                            buttons: [{type: 'ok'}]
                        });
                    } else {
                        tg.showPopup({
                            title: 'Purchase Failed',
                            message: `Sorry, the purchase was not completed. Status: ${status}`,
                            buttons: [{type: 'ok'}]
                        });
                    }
                });
            }
        });
    }

    return (
        <List>
            <Section
                header='Stars Shop'
                footer='Use your Stars to purchase these items'
            >
                <Cell
                    before={<Image src={starsSvg} style={{ backgroundColor: '#FFD700' }}/>}
                    subtitle='10 Stars'
                    onClick={() => initiateStarsPurchase('Premium Sticker Pack', 10)}
                >
                    Premium Sticker Pack
                </Cell>
                <Cell
                    before={<Image src={starsSvg} style={{ backgroundColor: '#FFD700' }}/>}
                    subtitle='20 Stars'
                    onClick={() => initiateStarsPurchase('Exclusive Theme', 20)}
                >
                    Exclusive Theme
                </Cell>
            </Section>
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
