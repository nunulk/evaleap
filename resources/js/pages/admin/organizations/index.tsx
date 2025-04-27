import { Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin-layout';
import type { Organization } from '@/types/app';

type Props = {
    organizations: Organization[];
};

export default ({ organizations }: Props) => {
    return (
        <AdminLayout title="Organization" description="Manage organizations">
            <Head title="Organizations" />
            <Button asChild><TextLink href="/admin/organizations/create" className="no-underline">Create</TextLink></Button>
            <ul className="list-none">
            {organizations.map((organization) => (
                <li key={organization.id}><TextLink href={`/admin/organizations/${organization.id}`}>{organization.name}</TextLink></li>
            ))}
            </ul>
        </AdminLayout>
    );
};
