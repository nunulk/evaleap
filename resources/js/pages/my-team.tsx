import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { PlusCircle, LogIn } from 'lucide-react';
import type { Team } from '@/types/app';
import { Card, CardContent } from '@/components/ui/card';
import { Heading2 } from '@/components/typography/heading';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My team',
        href: '/my-team',
    },
];

type Props = {
    teams: Team[];
};

export default function MyTeamPage({ teams }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My team" />
            <div className="p-8">
                <Heading2>My team</Heading2>
                <Card className="mt-4 p-4">
                    <CardContent>
                        <ul>
                            {teams.map((team: Team) => (
                                <li key={team.id} className="p-2"><Link href={`/teams/${team.id}`}>{team.name}</Link></li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <div className="flex gap-4 pt-4">
                    <div className="col-auto">
                        <Link href="/teams/create" as="button" className="flex p-2 gap-2 rounded-md hover:bg-sidebar-accent">
                            <PlusCircle />Create
                        </Link>
                    </div>
                    <div className="col-auto">
                        <Link href="/teams/join" as="button" className="flex p-2 gap-2 rounded-md hover:bg-sidebar-accent">
                            <LogIn />Join
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
