import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import type { Team, User } from '@/types/app';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading2 } from '@/components/typography/heading';

const breadcrumbs = (teamId: number): BreadcrumbItem[] => [
    {
        title: 'My team',
        href: '/my-team',
    },
    {
        title: 'View a team',
        href: `/teams/${teamId}`,
    },
];

type Props = {
    team: Team;
    members: User[];
}

export default function ShowPage({ team, members }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(team.id)}>
            <Head title="show team" />
            <div className="p-8">
                <Heading2>{team.name}</Heading2>
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>メンバー</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            {members.map((member) => (
                                <li key={member.id}>{member.name}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
