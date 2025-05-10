import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import type { Team } from '@/types/app';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Heading2 } from '@/components/typography/heading';

type Props = {
    teams: Team[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My team',
        href: '/my-team',
    },
    {
        title: 'Join to a new team',
        href: '/teams/join',
    },
];

export default function JoinToTeamPage({ teams }: Props) {
    const { post, processing } = useForm({});
    const joinToTeam = (id: number) => {
        post(route('teams.join.store', { id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Join to team" />
            <div className="p-8">
                <div>
                    <Heading2>Join to a team</Heading2>
                </div>
                <div className="pt-4">
                    <ul className="border  p-4 rounded-2xl">
                        {teams.map((team: Team) => (
                            <li key={team.id} className={`flex gap-4 items-center mb-4 p-4  odd:bg-inherit even:bg-gray-800`}>
                                <div className="w-1/4">{team.name}</div>
                                <div className="w-1/4"><Button disabled={processing} onClick={() => joinToTeam(team.id)}>Join</Button></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
