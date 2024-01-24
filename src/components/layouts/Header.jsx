import React from 'react';
import { SiShopify } from 'react-icons/si';
import { cn } from '../../utils';
import Button from '../ui/Button';
import { CgShoppingCart } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const goHome = () => navigate('/');
    return (
        <div className={cn('flex justify-between items-center py-12 px-24')}>
            <div
                className={cn('flex items-center gap-8 text-28 cursor-pointer')}
                onClick={goHome}
            >
                <SiShopify size="36" className={cn('text-primary')} />
                Shoppy
            </div>
            <div className={cn('flex items-center gap-8')}>
                <div>products</div>
                <CgShoppingCart size="32" />
                <Button size="lg" tw="uppercase">
                    login
                </Button>
            </div>
        </div>
    );
}

export default Header;
