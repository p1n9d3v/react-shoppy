import UserAvatar from 'components/ui/UserAvatar';
import React from 'react';
import { CgShoppingCart } from 'react-icons/cg';
import { SiShopify } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user';
import { cn } from '../../utils';
import Button from '../ui/Button';

function Header() {
    const { user, login, logout } = useUser();
    const navigate = useNavigate();

    return (
        <div className={cn('flex justify-between items-center py-12 px-24')}>
            <div
                className={cn('flex items-center gap-8 text-28 cursor-pointer')}
                onClick={() => navigate('/')}
            >
                <SiShopify size="36" className={cn('text-primary')} />
                Shoppy
            </div>
            <div className={cn('flex items-center gap-12')}>
                <div>products</div>
                <CgShoppingCart size="32" />
                {user && <UserAvatar user={user} />}
                <Button
                    size="lg"
                    tw="uppercase"
                    onClick={user ? logout : login}
                >
                    {user ? 'Logout' : 'Login'}
                </Button>
            </div>
        </div>
    );
}

export default Header;
