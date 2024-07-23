import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { FC, useEffect, useState } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import { useViewport, initUtils } from "@tma.js/sdk-react";

import tonSvg from './ton.svg';
import starsSvg from './ton.svg'; // 假设您有一个 Stars 图标

import './IndexPage.css';

export const IndexPage: FC = () => {
    const vp = useViewport();
    const [tg, setTg] = useState<any>(null);

    useEffect(() => {
        if (vp && !vp.isExpanded) {
            vp.expand();
        }
        const telegramWebApp = (window as any).Telegram?.WebApp;
        if (telegramWebApp) {
            setTg(telegramWebApp);
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

    const initiateStarsPurchase = (productName: string, price: number) => {
        if (!tg) return;

        tg.showConfirm(`Are you sure you want to buy ${productName} for ${price} Stars?`, (confirmed: any) => {
            if (confirmed) {
                // 这里应该调用您的后端 API 来处理 Stars 支付
                // 例如：
                fetch('/api/purchase-with-stars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productName,
                        price,
                        userId: tg.initDataUnsafe?.user?.id,
                        // 其他必要的信息
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            tg.showPopup({
                                title: 'Purchase Successful',
                                message: 'Thank you for your purchase!',
                                buttons: [{type: 'ok'}]
                            });
                        } else {
                            tg.showPopup({
                                title: 'Purchase Failed',
                                message: data.message || 'Sorry, the purchase was not completed.',
                                buttons: [{type: 'ok'}]
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        tg.showPopup({
                            title: 'Error',
                            message: 'An error occurred while processing your purchase.',
                            buttons: [{type: 'ok'}]
                        });
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
            {/* 其他 Sections 保持不变 */}
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
