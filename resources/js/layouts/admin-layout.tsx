import { ReactNode } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import type { SharedData } from '@/types';

interface AppLayoutProps {
    name?: string;
    title?: string;
    description?: string;
    children: ReactNode;
}

export default ({ title, description, children }: AppLayoutProps) => {
    const { auth } = usePage<SharedData>().props;
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {auth.user && (
                        <Link className="flex w-full hover: cursor-pointer" method="post" href={route('admin.logout')} as="button" onClick={handleLogout}>
                            <LogOut className="mr-2" />
                            Log out
                        </Link>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};
