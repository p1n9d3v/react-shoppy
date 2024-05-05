import UserAvatar from 'components/ui/UserAvatar';
import React from 'react';
import { CgShoppingCart } from 'react-icons/cg';
import { SiShopify } from 'react-icons/si';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user';
import { cn } from '../../utils';
import Button from '../ui/Button';
import useCart from 'hooks/useCart';

function Header() {
    const { user, login, logout } = useUser();
    const navigate = useNavigate();
    const { cartLength } = useCart({ query: true, uid: user?.uid });

    return (
        <div
            className={cn(
                'flex justify-between items-center py-12 px-24 border-b border-b-gray-100'
            )}
        >
            <div
                className={cn('flex items-center gap-8 text-28 cursor-pointer')}
                onClick={() => navigate('/')}
            >
                {login && (
                    <SiShopify size="36" className={cn('text-primary')} />
                )}
                Shoppy
            </div>
            <div className={cn('flex items-center gap-12')}>
                <div
                    className="relative cursor-pointer"
                    onClick={() => navigate('/cart')}
                >
                    <CgShoppingCart size="32" />

                    {cartLength > 0 && (
                        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white absolute -top-4 -right-12">
                            {cartLength}
                        </div>
                    )}
                </div>
                {user && user.isAdmin && (
                    <FaPencilAlt
                        className="w-28 h-28 cursor-pointer"
                        onClick={() => navigate('/products/new')}
                    />
                )}
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
